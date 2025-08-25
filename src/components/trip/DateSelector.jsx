import React from "react";
import { DateRange } from "react-date-range";
import { ko } from "date-fns/locale";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import styles from "../TripStart/TripStart.module.css";

export default function DateSelector({ startDate, endDate, onChange }) {
  const dateDisplay =
    startDate && endDate
      ? `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}`
      : "날짜를 선택하세요";

  const [showPicker, setShowPicker] = React.useState(false);

  return (
    <div className={styles.formGroup}>
      <h3 className={styles.label}>날짜 선택</h3>
      <div
        className={styles.inputBox}
        onClick={() => setShowPicker((prev) => !prev)}
      >
        {dateDisplay}
        <span className={styles.arrow}>{showPicker ? "▲" : "▼"}</span>
      </div>
      {showPicker && (
        <DateRange
          ranges={[{ startDate, endDate, key: "selection" }]}
          onChange={onChange}
          locale={ko}
          minDate={new Date()}
          moveRangeOnFirstSelection={false}
          rangeColors={["#4caf50"]}
        />
      )}
    </div>
  );
}