import { eachDayOfInterval, isWeekend } from 'date-fns';

class WeekdayCounter {
    constructor(holidayDataSource) {
        this.holidayDataSource = holidayDataSource;
    }

    async countWeekdayInRange(range) {
        const { start, end } = range;
        const holidays = await this.holidayDataSource.getHolidaysInRange(range);
        const days = eachDayOfInterval({ start, end });
        const weekdays = days.filter(date => !isWeekend(date) && holidays.every(holiday => holiday.getTime() !== date.getTime()));
        return weekdays.length;
    }
}

export default WeekdayCounter;