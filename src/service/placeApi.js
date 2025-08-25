// src/service/placeApi.js
import apiClient from "./apiClient";

export const getPlacesByArrival = (arrival) => {
  // arrival은 예: "서울", "부산"
  return apiClient.get(`/api/place/list`, {
    params: { arrival },
  });
};
