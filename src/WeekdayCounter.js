import React from 'react';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import * as locales from 'react-date-range/dist/locale';
import { DateRange } from 'react-date-range';

import { countWeekdayInRange } from './adapter/date_fetcher';

class WeekdayCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state.range.startDate = props.date;
    this.state.range.endDate = props.date;
  };

  state = {
    range: {
      startDate: new Date(),
      endDate: new Date(),
      key: 'range'
    },
    count: 0
  };

  update = async ({ range }) => {
    const { startDate, endDate } = range;
    const count = await countWeekdayInRange(startDate, endDate);
    this.setState({range, count});
  };

  render() {
    const { count, range } = this.state;

    return (
      <div className="App">
        <h1>날짜 수 세기</h1>
        <DateRange
          locale={locales['ko']}
          editableDateInputs={true}
          onChange={item => this.update(item)}
          moveRangeOnFirstSelection={false}
          ranges={[range]}
          dateDisplayFormat={'yyyy/MM/dd'}
        />
        <p data-testid='result'>{count} 일</p>
      </div>
    );
  };
}

export default WeekdayCounter;
