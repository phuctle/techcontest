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
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Error fetching users");
  }
};

export const createEventsAPI = async (data) => {
  try {
    const response = await apiClient.post("/insertOne", {
      collection: "Event",
      database: "AppyOurs",
      dataSource: "ClusterKMS",
      document: data,
    });
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Error fetching users");
  }
};
