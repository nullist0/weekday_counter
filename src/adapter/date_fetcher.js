import axios from 'axios';
import { differenceInDays, parse, differenceInBusinessDays, addDays, format, isWithinInterval, startOfMonth, addMonths, isBefore, isWeekend } from 'date-fns';
import { xml2js } from 'xml-js';

const ServiceKey = 'WaaCrB9DoKTrcjXH0w1djKS%2BOpxkxJY1nJ799SzraTyAHiByYdzvy00j3m5sndXjKvkJMQrJwFtPY36LzpEZTg%3D%3D';

function readDate({locdate: {_text}}) {
    const year = parseInt(_text.substr(0, 4));
    const month = parseInt(_text.substr(4, 2));
    const day = parseInt(_text.substr(6, 2));
    
    return new Date(year, month - 1, day);
};

async function getHolidaysIn(date) {
    const params = {
        year: format(date, 'yyyy'),
        month: format(date, 'MM')
    };
    const apiUrl = `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?serviceKey=${ServiceKey}&solYear=${params.year}&solMonth=${params.month}`;

    const { data } = await axios.get(apiUrl);
    const { response: { body: { items: { item } }} } = xml2js(data, {compact: true});
    const items = Array.isArray(item) ? item : (item ? [item] : undefined);
    return items?.map(readDate) ?? [];
};

function* monthsInRange(start, end) {
    let currentMonth = startOfMonth(start);
    const endMonth = startOfMonth(addMonths(end, 1));
    while(isBefore(currentMonth, endMonth)) {
        yield currentMonth;
        currentMonth = addMonths(currentMonth, 1);
    }
}

async function countWeekdayInRange(start, end) {
    const nextEndDate = addDays(end, 1);
    const nonWeekendCount = differenceInBusinessDays(nextEndDate, start);

    const months = Array.from(monthsInRange(start, end));

    const holidaysInRange = (await Promise.all(months.map(getHolidaysIn)))
        .flat()
        .filter(date => isWithinInterval(date, { start, end }))
        .filter(date => !isWeekend(date));
    const holidaysCount = holidaysInRange.length;

    return nonWeekendCount - holidaysCount;
};

export {
    countWeekdayInRange
};