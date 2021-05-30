import React, { useState } from 'react';
import { DateRangePicker } from './components/DateRangePicker';
import { CountResult } from './components/CountResult';

function App({ counter }) {
  const [count, setCount] = useState(0);
  const handleChangeRange = (range) => {
    counter.countWeekdayInRange(range).then(setCount);
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