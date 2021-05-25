import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import WeekdayCounter from './domain/weekdayCounter';
import * as XMLHolidayDataSource from './dataSource/xmlHolidayDataSource';
ReactDOM.render(
    <React.StrictMode>
      <App 
        counter={new WeekdayCounter(XMLHolidayDataSource)}
      />
    </React.StrictMode>,
    document.getElementById('root')
);