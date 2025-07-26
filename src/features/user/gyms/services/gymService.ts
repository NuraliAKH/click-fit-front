import axios from "axios";

export const fetchGyms = async () => {
  const response = await axios.get("http://192.168.1.177:3000/api/gyms");
  return response.data;
};
export const fetchGymById = async (id: string) => {
  const response = await axios.get(`http://192.167..1.177:3000/api/gyms/${id}`);
  return response.data;
};
