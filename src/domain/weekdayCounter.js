import { differenceInBusinessDays, addDays, isWithinInterval, startOfMonth, addMonths, isBefore, isWeekend } from 'date-fns';

function* monthsInRange(range) {
    const {start, end} = range;
    const endMonth = startOfMonth(addMonths(end, 1));

    let currentMonth = startOfMonth(start);

    while(isBefore(currentMonth, endMonth)) {
        yield currentMonth;
        currentMonth = addMonths(currentMonth, 1);
    }
}

function countAllNonWeekendIn(range) {
    const {start, end} = range;
    const nextEndDate = addDays(end, 1);
    
    return differenceInBusinessDays(nextEndDate, start);
}

async function countWeekdayHolidaysIn(dataSource, range) {
    const months = Array.from(monthsInRange(range));
    const holidaysInRange = (await Promise.all(months.map(dataSource.getHolidaysIn)))
        .flat()
        .filter(date => isWithinInterval(date, range))
        .filter(date => !isWeekend(date));
    
    return holidaysInRange.length;
}

async function countWeekdayInRange(dataSource, range) {
    const nonWeekendCount = countAllNonWeekendIn(range);
    const holidaysCount = await countWeekdayHolidaysIn(dataSource, range);

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