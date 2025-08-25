// src/main/frontend/src/pages/FinalItinerary.jsx

import React from "react";
import { useLocation } from "react-router-dom";

const FinalItinerary = () => {
  const location = useLocation();
  const { createdTrip, finalPlaces } = location.state || {};

  // 데이터가 없으면 잘못된 접근임을 알림
  if (!createdTrip || !finalPlaces) {
    return <div>잘못된 접근입니다.</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🎉 여행 일정 생성 완료! 🎉</h1>
      <hr style={{ margin: '20px 0' }} />

      <div style={{ border: '1px solid #e0e0e0', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2>여행 정보</h2>
        <p><strong>여행 제목:</strong> {createdTrip.title}</p>
        <p><strong>여행 기간:</strong> {createdTrip.startDate} ~ {createdTrip.endDate}</p>
        <p><strong>일정 ID:</strong> {createdTrip.id}</p>
      </div>

      <div style={{ border: '1px solid #e0e0e0', padding: '20px', borderRadius: '8px' }}>
        <h2>방문 장소 (순서)</h2>
        <ol style={{ paddingLeft: '20px' }}>
          {finalPlaces.map((place, index) => (
            <li key={place.id} style={{ margin: '10px 0', fontSize: '1.1em' }}>
              <strong>{index + 1}.</strong> {place.name || place.title}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default FinalItinerary;