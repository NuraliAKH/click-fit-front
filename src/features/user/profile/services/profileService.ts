import axios from "axios";

export const getUserProfile = async () => {
  const response = await axios.get("http://192.168.1.177:3000/api/auth/profile");
  return response.data;
};

export const updateProfile = async (data: any) => {
  try {
    const res = await axios.put("http://192.168.1.177:3000/api/auth/profile", data, {
      headers: {
        "Content-Type": "application/json",
        // Add this if you need authentication
        // Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    console.error("Update profile error:", error.response?.data || error.message);
    throw error; // Rethrow so you can handle it in UI
  }
};
