import React, { useState } from 'react';
import * as locales from 'react-date-range/dist/locale';
import { DateRange } from 'react-date-range';
import Range from '../domain/range';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export function DateRangePicker({ onChangeRange }) {
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
