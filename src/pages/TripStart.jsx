import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../components/TripStart/TripStart.module.css";
import { regions } from "../data/region.js";
import LocationSelector from "../components/trip/LocationSelector.jsx";
import DateSelector from '../components/trip/DateSelector.jsx'

export default function TripStart() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    departure: "",
    destination: "",
    startDate: new Date(),
    endDate: new Date(),
  });

  const [activeBox, setActiveBox] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formatDate = (date) =>
      date
        .toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\. /g, "-")
        .replace(/\.$/, "");
  
    const formattedForm = {
      ...form,
      startDate: formatDate(form.startDate),
      endDate: formatDate(form.endDate),
    };
  
    console.log("여행 정보:", formattedForm);
  
    navigate("./PlacesSelect", { 
      state: { 
        tripInfo: formattedForm,
        arrival: form.destination // 도착지를 arrival로 넘김
      } 
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trip Start</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <LocationSelector
          label="출발지"
          value={form.departure}
          regions={regions}
          active={activeBox === "departure"}
          onClick={() => setActiveBox(activeBox === "departure" ? null : "departure")}
          onSelect={(region) => {
            setForm((prev) => ({ ...prev, departure: region }));
            setActiveBox(null);
          }}
        />
        <LocationSelector
          label="도착지"
          value={form.destination}
          regions={regions}
          active={activeBox === "destination"}
          onClick={() => setActiveBox(activeBox === "destination" ? null : "destination")}
          onSelect={(region) => {
            setForm((prev) => ({ ...prev, destination: region }));
            setActiveBox(null);
          }}
        />
        <DateSelector
          startDate={form.startDate}
          endDate={form.endDate}
          onChange={(item) =>
            setForm((prev) => ({
              ...prev,
              startDate: item.selection.startDate,
              endDate: item.selection.endDate,
            }))
          }
        />
        <button
          type="submit"
          className={styles.submitButton}
          disabled={!form.departure || !form.destination}
        >
          다음
        </button>
      </form>
    </div>
  );
}