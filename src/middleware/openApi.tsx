import axios from "axios";

const openApi = axios.create({
  baseURL: "http://localhost:3000/api",
});

export default openApi;
