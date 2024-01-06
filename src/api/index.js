import axios from "axios";

const apiClient = axios.create({
  baseURL:
    "https://data.mongodb-api.com/app/data-nrerw/endpoint/data/v1/action",
  headers: {
    "Content-Type": "application/json",
    "api-key":
      "X5xhQPEgerLzbt1EIDQaxqrFxfjP9WNOI2e4EkkPLVg0cUKijDICeTOZcB8cGWn5",
  },
});

export const fetchEventsAPI = async () => {
  try {
    const response = await apiClient.post("/find", {
      collection: "Event",
      database: "AppyOurs",
      dataSource: "ClusterKMS",
    });
    console.log("response", response);
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Error fetching users");
  }
};

export const deleteUserAPI = async (userId) => {
  try {
    const response = await apiClient.delete(`/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    throw new Error("Error deleting user");
  }
};

export const createUserAPI = async (userData) => {
  try {
    const response = await apiClient.post("/user", userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Error creating user");
  }
};
