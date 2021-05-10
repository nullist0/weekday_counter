import { useState } from "react";

function dateString(date) {
  const year = date.getFullYear();
  const month = date.getMonth().toString().padStart(2, '0');
  const day = date.getDay().toString().padStart(2, '0');
  return `${year}/${month}/${day}`;
};

export default function App({ date }) {
  date = date ?? new Date();

  const [count, setCount] = useState(1);
  const [startDate, setStartDate] = useState(date);
  const [endDate, setEndDate] = useState(date);

  return (
    <div className="App">
      <h1>날짜 수 세기</h1>
      <p>{dateString(startDate)}</p>
      <p>{dateString(endDate)}</p>
      <p>{count} 일</p>
    </div>
  );
};
