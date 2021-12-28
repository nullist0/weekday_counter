import Range from '../domain/range';
import WeekdayCounter from '../domain/weekday_counter';

describe('count weekday in a range', () => {
    const fakeHolidayDataSource = (dates) => {
        return {
            getHolidaysInRange: () => dates
        }
    };

    it('given a non-holiday weekday, count 1 day', async () => {
        // given
        const date = new Date(2021, 4, 21);
        const range = new Range(date, date);
        const counter = new WeekdayCounter(fakeHolidayDataSource([]));
    
        // when
        const count = await counter.countWeekdayInRange(range);
    
        // then
        expect(count).toBe(1);
    });

    it('given a weekend, count 0 day', async () => {
        // given
        const date = new Date(2021, 4, 22);
        const range = new Range(date, date);
        const counter = new WeekdayCounter(fakeHolidayDataSource([]));
        
        // when
        const count = await counter.countWeekdayInRange(range);
    
        // then
        expect(count).toBe(0);
    });

    it('given a holiday, count 0 day', async () => {
        // given
        const date = new Date(2021, 4, 21);
        const range = new Range(date, date);
        const counter = new WeekdayCounter(fakeHolidayDataSource([date]));
        
        // when
        const count = await counter.countWeekdayInRange(range);
    
        // then
        expect(count).toBe(0);
    });

    it('count 5 day if there is no weekday holiday in a given week', async () => {
        // given
        const start = new Date(2021, 4, 17);
        const end = new Date(2021, 4, 23);
        const range = new Range(start, end);
        const counter = new WeekdayCounter(fakeHolidayDataSource([]));
    
        // when
        const count = await counter.countWeekdayInRange(range);
    
        // then
        expect(count).toBe(5);
    });

    it('count 4 day if there is 1 weekday holiday in a given week', async () => {
        // given
        const start = new Date(2021, 4, 17);
        const end = new Date(2021, 4, 23);
        const holiday = new Date(2021, 4, 20);
        const range = new Range(start, end);
        const counter = new WeekdayCounter(fakeHolidayDataSource([holiday]));
    
        // when
        const count = await counter.countWeekdayInRange(range);
    
        // then
        expect(count).toBe(4);
    });
});