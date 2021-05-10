import { render, screen } from '@testing-library/react';
import JestMock from 'jest-mock';
import App from '../App';

class ApplicationRunner {
    constructor() {
        const { getByText, queryAllByText } = render(<App/>);
        this.getByText = getByText;
        this.queryAllByText = queryAllByText;
    }

    dateString = (date) => {
        return `${date.getYear()}/${date.getMonth().toString().padEnd(2, '0')}/${date.getDay().toString().padEnd(2, '0')}`;
    };

    showsToday = () => {
        const date = Date.now();
        expect(this.queryAllByText(this.dateString(date)).length).toBe(2);
    };

    showsResult = (result) => {
        expect(this.getByText(`${result} 일`)).toBeInTheDocument();
    };
}

test('count one day if today is not a holiday.', () => {
    Date.now = JestMock.fn(() => new Date(2021, 5, 11));
    
    const application = new ApplicationRunner();
    
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
