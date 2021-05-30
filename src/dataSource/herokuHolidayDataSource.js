import axios from 'axios';
import { isBefore } from 'date-fns';
import addMonths from 'date-fns/addMonths';
import isWeekend from 'date-fns/isWeekend';
import isWithinInterval from 'date-fns/isWithinInterval';
import startOfMonth from 'date-fns/startOfMonth';
import Month from './month';

function readDate(dateString) {
    const year = parseInt(dateString.substr(0, 4));
    const month = parseInt(dateString.substr(4, 2));
    const day = parseInt(dateString.substr(6, 2));
    
    return new Date(year, month - 1, day);
}

const cache = {};

async function getHolidaysInMonth({ year, month }) {
    const apiUrl = `https://shielded-forest-67184.herokuapp.com/holidays?year=${year}&month=${month}`;

    if (cache[apiUrl] === undefined) {
        const { data: { dates } } = await axios.get(apiUrl);
        const holidays = dates.map(readDate);
        cache[apiUrl] = holidays;
    }
    return cache[apiUrl];
}

function* monthsInRange(range) {
    const {start, end} = range;
    const endMonth = startOfMonth(addMonths(end, 1));
    let currentMonth = startOfMonth(start);

    while(isBefore(currentMonth, endMonth)) {
        yield new Month(currentMonth);
        currentMonth = addMonths(currentMonth, 1);
    }
}

async function getHolidaysInRange(range) {
    const months = Array.from(monthsInRange(range));
    
    return (await Promise.all(months.map(getHolidaysInMonth)))
        .flat()
        .filter(date => isWithinInterval(date, range))
        .filter(date => !isWeekend(date));
}

export {
    getHolidaysInRange
}