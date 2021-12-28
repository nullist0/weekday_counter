import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import WeekdayCounter from './domain/weekday_counter';
import HerokuHolidayAPI from './api/heroku_holiday_api';

ReactDOM.render(
    <React.StrictMode>
      <App 
        counter={new WeekdayCounter(new HerokuHolidayAPI())}
      />
    </React.StrictMode>,
    document.getElementById('root')
);