import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { createTrip } from "../service/tripApi"; // tripApi에서 함수 import

const ReorderPlaces = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tripInfo, selectedPlaces } = location.state || {};

  const [places, setPlaces] = useState(selectedPlaces || []);

  if (!tripInfo || !selectedPlaces) {
    return <div>잘못된 접근입니다.</div>;
  }

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newPlaces = Array.from(places);
    const [reorderedItem] = newPlaces.splice(result.source.index, 1);
    newPlaces.splice(result.destination.index, 0, reorderedItem);

    setPlaces(newPlaces);
  };

  const handleFinalize = async () => {
    const tripData = {
      title: `${tripInfo.destination} 여행`,
      startDate: tripInfo.startDate,
      endDate: tripInfo.endDate,
      userId: 1, // 실제로는 로그인한 사용자의 ID를 사용해야 합니다.
      placeList: places.map((place, index) => ({
        placeId: place.id,
        // 이 부분은 사용자에게 날짜를 선택하게 하는 로직으로 추후 변경될 수 있습니다.
        // 현재는 첫째 날로 고정합니다.
        visitDate: tripInfo.startDate,
        visitOrder: index + 1, // 드래그 앤 드롭으로 정해진 순서
      })),
    };

    try {
      // tripApi의 createTrip 함수를 호출하여 API 요청을 보냅니다.
      const response = await createTrip(tripData);
      const createdTrip = response.data;

      console.log("일정 생성 성공:", createdTrip);
      alert("일정이 성공적으로 생성되었습니다.");

      // 성공 후 "FinalItinerary" 페이지로 이동하며 생성된 데이터 전달
      navigate("/final-itinerary", { state: { createdTrip, finalPlaces: places } });

    } catch (error) {
      console.error("일정 생성 중 오류 발생:", error);
      
      // axios 에러 핸들링을 통해 더 상세한 정보를 출력합니다.
      if (error.response) {
          console.error("오류 응답 데이터:", error.response.data);
          console.error("오류 상태 코드:", error.response.status);
      } else if (error.request) {
          console.error("오류 요청:", error.request);
      } else {
          console.error("오류 메시지:", error.message);
      }
      
      alert("일정 생성에 실패했습니다.");
    }
  };

  return (
    <div>
      <h1>여행 장소 순서 정하기</h1>
      <p>도착지: {tripInfo.destination}</p>
      <p>기간: {tripInfo.startDate} ~ {tripInfo.endDate}</p>

      <hr />

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="places">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {places.map((place, index) => (
                <Draggable key={place.id} draggableId={String(place.id)} index={index}>
                  {(provided, snapshot) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        padding: '10px',
                        margin: '10px 0',
                        border: '1px solid #ddd',
                        backgroundColor: snapshot.isDragging ? '#f0f0f0' : 'white',
                        listStyle: 'none'
                      }}
                    >
                      {index + 1}. {place.name || place.title}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      <button onClick={handleFinalize} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
        일정 확정하기
      </button>
    </div>
  );
};

export default ReorderPlaces;