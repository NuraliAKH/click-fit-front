import axios from "axios";

export const updateUserRole = async (data: any) => {
  const response = await axios.post("http://192.168.1.177:3000/api/auth/give-role", data);
  return response.data;
};
