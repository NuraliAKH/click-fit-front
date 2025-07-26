import { AxiosRequestConfig } from "axios";
import dayjs from "dayjs";
import { Identifier } from "../types/Identifier";
import { Api } from "../api/Api";
export interface FilterParams {
  [key: string]: string | number | boolean | undefined;
}

export type DateFields<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

export abstract class CRUDService<T extends { id: Identifier }> extends Api {
  protected basePath: string;
  protected abstract dateFields: DateFields<T>[];
  protected abstract fileFields: DateFields<T>[];

  constructor(basePath: string) {
    super();
    this.basePath = basePath;
  }

  protected formatDates<D extends Partial<T>>(data: D): D {
    const formatted = { ...data };
    for (const field of this.dateFields) {
      const value = data[field] as string;
      if (typeof value === "string" && dayjs(value, ["YYYY-MM-DD", "YYYY-MM-DDTHH:mm:ss.SSSZ"], true).isValid()) {
        (formatted[field] as any) = dayjs(value).format("YYYY-MM-DD");
      } else if (dayjs.isDayjs(value)) {
        (formatted[field] as any) = value.format("YYYY-MM-DD");
      }
    }
    return formatted;
  }

  protected formatDatesFromResponse<D extends Partial<T>>(data: D): D {
    const formatted = { ...data };
    for (const field of this.dateFields) {
      const value = data[field] as string;
      (formatted[field] as any) = dayjs(value);
    }

    return formatted;
  }

  protected formatFileFieldsFromResponse<D extends Partial<T>>(data: D): D {
    const formatted = { ...data };
    for (const field of this.fileFields) {
      const value = data[field] as string;

      if (typeof value === "string") {
        (formatted[field] as any) = {
          uid: value,
          name: value,
          status: "done",
          url: value,
        };
      }
    }

    return formatted;
  }

  async fetchAll(params?: string) {
    if (params) {
      const url = `${this.basePath}?${params}`;
      return this.get<T[]>(url);
    }
    return this.get<T[]>(this.basePath);
  }

  async create(payload: Omit<T, "id">) {
    try {
      const formattedData = this.formatDates(payload as Partial<T>) as Omit<T, "id">;

      const config: AxiosRequestConfig = {};
      if (this.fileFields.length > 0) {
        config.headers = {
          "Content-Type": "multipart/form-data",
        };

        const formData = this.objectToFormData(formattedData);
        const response = await this.post<T>(this.basePath, formData, config);
        console.log("✅ Create success (with file):", response);
        return response;
      }

      const response = await this.post<T>(this.basePath, formattedData);
      console.log("✅ Create success:", response);
      return response;
    } catch (error: any) {
      console.error("❌ Create error:", error?.response?.data || error?.message || error);
      throw error; // Пробрасываем дальше, чтобы можно было обрабатывать выше по стеку
    }
  }

  async fetchById(id: Identifier) {
    const response = await this.get<T>(`${this.basePath}/${id}`);
    let formatted = this.formatDatesFromResponse(response.data);
    formatted = this.formatFileFieldsFromResponse(formatted);
    return formatted || null;
  }

  async update(id: Identifier, payload: Partial<Omit<T, "id">>) {
    console.log("[UPDATE] id:", id);
    console.log("[UPDATE] original payload:", payload);

    try {
      const formattedData = this.formatDates(payload as Partial<T>);
      console.log("[UPDATE] formattedData:", formattedData);

      const config: AxiosRequestConfig = {};

      if (this.fileFields.length > 0) {
        config.headers = {
          "Content-Type": "multipart/form-data",
        };

        const formData = this.objectToFormData(formattedData);
        console.log("[UPDATE] Sending as FormData to:", `${this.basePath}/${id}`);
        console.log("[UPDATE] Headers:", config.headers);
        formData.forEach((value, key) => {
          console.log(`[FormData] ${key}:`, value);
        });

        return await this.put<Partial<Omit<T, "id">>>(`${this.basePath}/${id}`, formData, config);
      }

      console.log("[UPDATE] Sending as JSON to:", `${this.basePath}/${id}`);
      return await this.put<Partial<Omit<T, "id">>>(`${this.basePath}/${id}`, formattedData);
    } catch (error: any) {
      console.error("[UPDATE] ❌ Ошибка при обновлении:", error?.message);

      if (error?.response) {
        console.error("[UPDATE] ❌ Ответ сервера:", {
          status: error.response.status,
          data: error.response.data,
        });
      }

      throw error; // пробросим ошибку выше, чтобы её можно было обработать
    }
  }

  async remove(id: Identifier) {
    return this.delete(`${this.basePath}/${id}`);
  }

  protected buildQueryString(params: FilterParams): string {
    return Object.entries(params)
      .filter(([_, value]) => value !== undefined) // eslint-disable-line @typescript-eslint/no-unused-vars
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
      .join("&");
  }

  protected objectToFormData(obj: Record<string, any>): FormData {
    const formData = new FormData();

    Object.entries(obj).forEach(([key, value]) => {
      if (value !== undefined) {
        if (value instanceof File) {
          formData.append(key, value, value.name);
        } else if (typeof value === "object" && value !== null && value.originFileObj instanceof File) {
          // ✅ Ant Design Upload file support
          formData.append(key, value.originFileObj, value.originFileObj.name);
        } else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            if (item instanceof File) {
              formData.append(`${key}[${index}]`, item, item.name);
            } else if (item?.originFileObj instanceof File) {
              formData.append(`${key}[${index}]`, item.originFileObj, item.originFileObj.name);
            } else {
              formData.append(`${key}[${index}]`, String(item));
            }
          });
        } else if (typeof value === "object") {
          // Можно сериализовать в JSON если это обычный объект
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      }
    });

    return formData;
  }
}
