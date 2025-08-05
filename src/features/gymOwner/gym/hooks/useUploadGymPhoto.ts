import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type UploadPhotoParams = {
  gymId: number;
  image: {
    uri: string;
    type: string;
    fileName: string;
  };
  isMain: boolean;
};

export const useUploadGymPhoto = () => {
  return useMutation({
    mutationFn: async ({ gymId, image, isMain }: UploadPhotoParams) => {
      const formData = new FormData();
      formData.append("file", {
        uri: image.uri,
        type: image.type,
        name: image.fileName,
      } as any);
      formData.append("gymId", String(gymId));
      formData.append("isMain", String(isMain));

      const response = await fetch("http://192.168.1.177:3000/upload/image", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Ошибка загрузки фото");
      }

      const data = await response.json();
      return data;
    },
    onError: error => {
      console.error("Ошибка загрузки фото:", error);
      throw error;
    },
    onSuccess: () => {
      console.log("Фото успешно загружено");
    },
  });
};
