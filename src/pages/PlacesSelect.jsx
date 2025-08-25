import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // useNavigate 추가
import { getPlacesByArrival } from "../service/placeApi";

function PlacesSelect() {
  const location = useLocation();
  const navigate = useNavigate(); // useNavigate 훅 사용
  const { tripInfo, arrival } = location.state || {};
  
  const [places, setPlaces] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]); // 선택된 장소를 저장할 상태

  useEffect(() => {
    if (arrival) {
      getPlacesByArrival(arrival)
        .then((res) => {
          console.log("백엔드로부터 받은 응답 데이터:", res.data);
          setPlaces(Array.isArray(res.data) ? res.data : []);
        })
        .catch((err) => {
          console.error("장소 불러오기 실패:", err);
          setPlaces([]);
        });
    }
  }, [arrival]);

  // 장소 선택/선택 해제 핸들러
  const handleSelectPlace = (place) => {
    setSelectedPlaces((prevSelected) => {
      // 이미 선택된 장소인지 확인
      const isSelected = prevSelected.some((p) => p.id === place.id);

      if (isSelected) {
        // 이미 선택되어 있으면 제거
        return prevSelected.filter((p) => p.id !== place.id);
      } else {
        // 선택되어 있지 않으면 추가
        return [...prevSelected, place];
      }
    });
  };

  // 다음 단계로 이동하는 핸들러
  const handleNext = () => {
    if (selectedPlaces.length > 0) {
      navigate("/ReorderPlaces", {
        state: {
          tripInfo: tripInfo,
          arrival: arrival,
          selectedPlaces: selectedPlaces,
        },
      });
    } else {
      alert("장소를 한 개 이상 선택해주세요.");
    }
  };

  return (
    <div>
      <h1>여행 장소 선택</h1>
      <p>도착지: {tripInfo?.destination} | 기간: {tripInfo?.startDate} ~ {tripInfo?.endDate}</p>

      <hr />

      <h2>선택된 장소 ({selectedPlaces.length}개)</h2>
      {selectedPlaces.length > 0 ? (
        <ul>
          {selectedPlaces.map((place) => (
            <li key={place.id}>
              {place.title}
            </li>
          ))}
        </ul>
      ) : (
        <p>아직 선택된 장소가 없습니다.</p>
      )}

      {selectedPlaces.length > 0 && (
        <button onClick={handleNext} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
          선택 완료 및 장소 순서 정하기
        </button>
      )}

      <hr />

      <h2>추천 장소</h2>
      {places?.length > 0 ? (
        <ul>
          {places.map((place) => (
            <li
              key={place.id}
              style={{
                marginBottom: '20px',
                padding: '10px',
                cursor: 'pointer',
                border: selectedPlaces.some((p) => p.id === place.id) ? '2px solid #007bff' : '1px solid #ccc',
                backgroundColor: selectedPlaces.some((p) => p.id === place.id) ? '#eaf4ff' : 'white'
              }}
              onClick={() => handleSelectPlace(place)}
            >
              <h3>{place.title}</h3>
              <p>카테고리: {place.category}</p>
              <p>주소: {place.address}</p>
              {place.imageUrl && <img src={place.imageUrl} alt={place.title} style={{ maxWidth: '100%', height: 'auto' }} />}
            </li>
          ))}
        </ul>
      ) : (
        <p>선택하신 도착지에 대한 추천 장소가 없습니다.</p>
      )}
    </div>
  );
}

export default PlacesSelect;