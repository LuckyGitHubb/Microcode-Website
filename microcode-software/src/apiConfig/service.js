import axios from "axios";
import ApiConfig from "./ApiConfig";
// import toast from "react-hot-toast";

export const apiRequestHandler = async ({
  method = "GET",     // default method
  endPoint,
  data = {},
  params = {},
  headers = {},
}) => {
  try {
    const response = await axios({
      method,
      url: ApiConfig[endPoint] || endPoint, // fallback if endpoint is full URL
      data: ["POST", "PUT", "PATCH", "DELETE"].includes(method.toUpperCase()) ? data : undefined,
      params: method.toUpperCase() === "GET" ? params : undefined,
      headers,
    }); 
    console.log(response.data)
    if (response?.data?.responseCode === 200 || response?.status === 200 || response?.data?.success) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return error;
    }
  }
};
