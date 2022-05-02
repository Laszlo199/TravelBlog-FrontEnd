import axios from "axios";
const token = "...";
export default axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
