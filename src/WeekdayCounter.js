function dateString(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}/${month}/${day}`;
};

function isSaturday(date) {
    return date.getDay() === 6;
};

function isSunday(date) {
    return date.getDay() === 0;
};

export default function WeekdayCounter({
    date
}) {
  // const key = 'WaaCrB9DoKTrcjXH0w1djKS%2BOpxkxJY1nJ799SzraTyAHiByYdzvy00j3m5sndXjKvkJMQrJwFtPY36LzpEZTg%3D%3D';
  // const year = '2015';
  // const month = '09';
  // const url = `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?serviceKey=${key}&solYear=${year}&solMonth=${month}`;

  let count = 0;

  if (isSaturday(date) || isSunday(date)) count = 0;
  else count = 1;

  return (
    <div className="App">
      <h1>날짜 수 세기</h1>
      <p data-testid='start_date'>{dateString(date)}</p>
      <p data-testid='end_date'>{dateString(date)}</p>
      <p data-testid='result'>{count} 일</p>
    </div>
  );
};
