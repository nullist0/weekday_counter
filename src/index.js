import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import WeekdayCounter from './domain/weekdayCounter';
import * as HerokuHolidayDataSource from './dataSource/herokuHolidayDataSource';
import HolidayCache from './cache/holidayCache';

ReactDOM.render(
    <React.StrictMode>
      <App 
        counter={new WeekdayCounter(new HolidayCache(HerokuHolidayDataSource))}
      />
    </React.StrictMode>,
    document.getElementById('root')
);