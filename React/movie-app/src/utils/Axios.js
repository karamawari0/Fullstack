import axios from "axios";

const api = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8000/",
});

api.interceptors.response.use(
  (response) => {
    console.log("the response status is:", response.status);
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      console.log("the error response status is:", error.response.status);
      window.location =
        window.location.protocol + "//" + window.location.host + "/auth";
    }
    return Promise.reject(error);
  }
);

export default api;
