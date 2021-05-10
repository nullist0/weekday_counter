import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

class ApplicationRunner {
    constructor(date) {
        this.today = date;

        const { getByText, queryAllByText } = render(<App date={this.today}/>);
        this.getByText = getByText;
        this.queryAllByText = queryAllByText;
    }

    dateString = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth().toString().padStart(2, '0');
        const day = date.getDay().toString().padStart(2, '0');
        return `${year}/${month}/${day}`;
    };

    showsToday = () => {
        expect(this.queryAllByText(this.dateString(this.today)).length).toBe(2);
    };

    showsResult = (result) => {
        expect(this.getByText(`${result} 일`)).toBeInTheDocument();
    };
}

// first test
test('count one day if today is not a holiday.', () => {   
    const today = new Date(2021, 5, 11); 
    const application = new ApplicationRunner(today);
    
    application.showsToday();
    application.showsResult(1);
});

// test('count weekdays on a week without holiday', () => {
//     const application = new ApplicationRunner();
//     const startDate = new Date(2021, 5, 23);
//     const endDate = new Date(2021, 5, 29);

//     application.setStartDate(startDate);
//     application.showsStartDate(startDate);
//     application.setEndDate(endDate);
//     application.showsEndDate(endDate);
//     application.hasResultAweek();
// });
