import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { RequestBase } from "./RequestBase";
export interface ApiResponse<T> {
  [x: string]: any;
  data: T;
  message: string;
}

export class Api extends RequestBase {
  protected instance?: AxiosInstance;

  private baseURL = "";

  constructor() {
    super();
    this.setInstance();
  }

  setInstance() {
    this.baseURL = "http://192.168.1.177:3000/api/";
    this.instance = axios.create({
      withCredentials: true,
      baseURL: this.baseURL,
    });
  }

  async post<T, U = Omit<T, "id">>(
    url = "",
    data?: U | FormData,
    config: AxiosRequestConfig = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance?.post<ApiResponse<T>>(url, data, config);
      return await (response?.data ?? Promise.reject(new Error("No data received")));
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  async get<T>(url = "", config: AxiosRequestConfig = {}): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance?.get<ApiResponse<T>>(url, config);
      return await (response?.data ?? Promise.reject(new Error("No data received")));
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  async put<T, U = Partial<T>>(
    url: string,
    data: U | FormData,
    config: AxiosRequestConfig = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance?.put<ApiResponse<T>>(url, data, config);
      return await (response?.data ?? Promise.reject(new Error("No data received")));
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  async delete<T>(url = "", config: AxiosRequestConfig = {}): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance?.delete<ApiResponse<T>>(url, config);
      return await (response?.data ?? Promise.reject(new Error("No data received")));
    } catch (error) {
      return await Promise.reject(error);
    }
  }
}
