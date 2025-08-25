// src/service/apiClient.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080", // 백엔드 주소 (포트 맞춰 변경)
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
