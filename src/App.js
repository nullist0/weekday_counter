import React, { useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import * as locales from 'react-date-range/dist/locale';
import { DateRange } from 'react-date-range';
import Range from './domain/range';

function CountResult({ count }) {
  return (
    <p data-testid='result'>{count} 일</p>
  );
}

function DateRangePicker({ onChangeRange }) {
  const [dateRange, setRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'dateRange'
  });
  const handleChangeDateRange = ({ dateRange }) => {
    const range = new Range(dateRange.startDate, dateRange.endDate);

    setRange(dateRange);
    onChangeRange(range);
  };

  return (
    <DateRange
      locale={locales['ko']}
      editableDateInputs={true}
      onChange={item => handleChangeDateRange(item)}
      
      ranges={[dateRange]}
      dateDisplayFormat={'yyyy/MM/dd'}
    />
  );
}

function App({ counter }) {
  const [count, setCount] = useState(0);
  const handleChangeRange = async (range) => {
    const newCount = await counter.countWeekdayInRange(range);
    setCount(newCount);
  };

  return (
    <div className="App">
      <h1>날짜 수 세기</h1>
      <DateRangePicker 
        onChangeRange={handleChangeRange}
      />
      <CountResult
        count={count}
      />
    </div>
  );
}

export default App;