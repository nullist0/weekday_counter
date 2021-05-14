import React from 'react';

import { format } from './utils/date_formmatter';
import { isWeekday } from './adapter/date_fetcher';

class WeekdayCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state.date = props.date;
  };

  state = {
    date: new Date(),
    count: 0
  };
  
  componentDidMount() {
    const setCount = async ({ date }) => {
      const isHoliday = !(await isWeekday(date));
      this.setState(current => Object.assign(current, {count: isHoliday ? 0 : 1}));
    };
    setCount(this.state);
  };

  render() {
    const { date, count } = this.state;

    return (
      <div className="App">
        <h1>날짜 수 세기</h1>
        <p data-testid='start_date'>{format(date)}</p>
        <p data-testid='end_date'>{format(date)}</p>
        <p data-testid='result'>{count} 일</p>
      </div>
    );
  };
}

export default WeekdayCounter;
