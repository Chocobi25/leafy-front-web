// src/service/tripApi.js

import apiClient from "./apiClient";

// 새로운 여행을 생성하는 API 함수
export const createTrip = (tripData) => {
  return apiClient.post("/api/trip", tripData);
};

// 특정 여행 ID로 여행 정보를 가져오는 API 함수
export const getTripById = (tripId) => {
  return apiClient.get(`/api/trip/${tripId}`);
};

// 특정 여행의 장소 목록을 가져오는 API 함수
export const getTripPlaces = (tripId) => {
  return apiClient.get(`/api/trip/${tripId}/places`);
};

// 여행을 삭제하는 API 함수
export const deleteTrip = (tripId) => {
  return apiClient.delete(`/api/trip/${tripId}`);
};