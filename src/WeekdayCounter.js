import axios from 'axios';
import { xml2js } from 'xml-js';
import React from 'react';

const ServiceKey = 'WaaCrB9DoKTrcjXH0w1djKS%2BOpxkxJY1nJ799SzraTyAHiByYdzvy00j3m5sndXjKvkJMQrJwFtPY36LzpEZTg%3D%3D';

class WeekdayCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state.date = props.date;
  };

  state = {
    date: new Date(),
    count: 0
  };
  
  getHolidays = async () => {
    function readDate({locdate: {_text}}) {
      const year = parseInt(_text.substr(0, 4));
      const month = parseInt(_text.substr(4, 2));
      const day = parseInt(_text.substr(6, 2));
      
      return new Date(year, month - 1, day);
    };

    const { date } = this.state;
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const apiUrl = `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?serviceKey=${ServiceKey}&solYear=${year}&solMonth=${month}`;
    
    const { data } = await axios.get(apiUrl);
    const { response: { body: { items: { item } }} } = xml2js(data, {compact: true});
    return item.map(readDate);
  };

  isSaturday = (date) => {
      return date.getDay() === 6;
  };

  isSunday = (date) => {
      return date.getDay() === 0;
  };

  isHoliday = async (date) => {
    const dates = await this.getHolidays();
    return date in dates;
  };

  componentDidMount() {
    const setCount = async () => {
      const { date } = this.state;
  
      if (this.isSaturday(date) || this.isSunday(date) || await this.isHoliday(date)) {
        this.setState(current => current.count = 0);
      } else {
        this.setState(current => current.count = 1);
      }
    };
    setCount();
  };

  render() {
    function dateString(date) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}/${month}/${day}`;
    };

    const { date, count } = this.state;
    
    return (
      <div className="App">
        <h1>날짜 수 세기</h1>
        <p data-testid='start_date'>{dateString(date)}</p>
        <p data-testid='end_date'>{dateString(date)}</p>
        <p data-testid='result'>{count} 일</p>
      </div>
    );
  };
}

export default WeekdayCounter;

// export default function WeekdayCounter({
//     date
// }) {
//   const year = date.getFullYear().toString();
//   const month = (date.getMonth() + 1).toString().padStart(2, '0');
//   const apiUrl = `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?serviceKey=${ServiceKey}&solYear=${year}&solMonth=${month}`;

//   let [count, setCount] = useState(0);


//   useEffect(() => {
//     const process = async () => {
//       if (isSaturday(date) || isSunday(date)) setCount(0);
//       else setCount(1);
//     };
//     process();
//   }, [date]);

// };
