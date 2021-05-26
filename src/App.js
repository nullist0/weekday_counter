import React, { useEffect, useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import * as locales from 'react-date-range/dist/locale';
import { DateRange } from 'react-date-range';
import Range from './domain/range';

function CountResult({ counter, range }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const handleRange = async () => {
      const cache = await counter.countWeekdayInRange(range);
      setCount(cache);
    };
    handleRange();
  }, [counter, range]);
  
  return (
    <p data-testid='result'>{count} 일</p>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.counter = props.counter;
  }

  state = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'range'
  }

  toRange = (state) => {
    const { startDate, endDate } = state;

    return new Range(startDate, endDate);
  }

  update = ({ range }) => {
    this.setState(range);
  }

  render() {
    const range = this.state;

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
        <CountResult
          counter={this.counter}
          range={this.toRange(range)} 
        />
      </div>
    );
  }
}

export default App;