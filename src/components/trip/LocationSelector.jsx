import React from "react";
import styles from "../TripStart/TripStart.module.css";

export default function LocationSelector({ label, value, onClick, regions, active, onSelect }) {
  return (
    <div className={styles.formGroup}>
      <h3 className={styles.label}>{label}</h3>
      <div
        className={`${styles.inputBox} ${active ? styles.active : ""}`}
        onClick={onClick}
      >
        {value || `${label}를 선택하세요`}
        <span className={styles.arrow}>{active ? "▲" : "▼"}</span>
      </div>
      {active && (
        <div className={styles.locationGrid}>
          {regions.map((region, idx) => (
            <div
              key={idx}
              onClick={() => onSelect(region)}
              className={`${styles.locationItem} ${value === region ? styles.selected : ""}`}
            >
              {region}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}