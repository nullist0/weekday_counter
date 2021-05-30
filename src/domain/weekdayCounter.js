import { differenceInBusinessDays, addDays } from 'date-fns';

function countAllNonWeekendIn(range) {
    const {start, end} = range;
    const nextEndDate = addDays(end, 1);
    
    return differenceInBusinessDays(nextEndDate, start);
}

async function countWeekdayInRange(dataSource, range) {
    const nonWeekendCount = countAllNonWeekendIn(range);
    const holidaysInRange = await dataSource.getHolidaysInRange(range);
    const holidaysCount = holidaysInRange.length;

    return nonWeekendCount - holidaysCount;
}

export default class WeekdayCounter {
    constructor(holidayDataSource) {
        this.holidayDataSource = holidayDataSource;
    }

    countWeekdayInRange(range) {
        return countWeekdayInRange(this.holidayDataSource, range);
    }
}