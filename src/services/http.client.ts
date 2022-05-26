import axios from "axios";
export default axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: {
    "Content-type": "application/json",
    Authorization: "",
  },
});
