import axios from "axios";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInBob25lIjoiMTIzNDU2Nzg5IiwiZnVsbE5hbWUiOiJJJ20gQWRtaW4iLCJyb2xlIjoiQURNSU4iLCJzdWIiOiI2OTkwODczOTRiZjY3NmNkNmM2N2RjZmEiLCJhdmF0YXIiOiIyMTIzMmYyOTdhNTdhNWE3NDM4OTRhMGU0YTgwMWZjMy5wbmciLCJpYXQiOjE3NzExMzY5MzEsImV4cCI6MTc3MTE3MjkzMX0.Q66IGHVvRmQMwc8FxAEJYiZVzEWmDiPJ-S_p1MzK2rs"

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: { Authorization: `Bearer ${token}` }
});

// Alter defaults after instance has been created
// instance.defaults.headers.common["Authorization"] = AUTH_TOKEN;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before the request is sent
    return config;
  },
  function (error) {
    // Do something with the request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lies within the range of 2xx causes this function to trigger
    // Do something with response data
    if(response.data && response.data.data) return response.data;
    return response;
  },
  function (error) {
    // Any status codes that fall outside the range of 2xx cause this function to trigger
    // Do something with response error
    if(error.response && error.response.data) return error.response.data;
    return Promise.reject(error);
  },
);

export default instance;