import axios from 'axios';
import { xml2js } from 'xml-js';

const ServiceKey = 'WaaCrB9DoKTrcjXH0w1djKS%2BOpxkxJY1nJ799SzraTyAHiByYdzvy00j3m5sndXjKvkJMQrJwFtPY36LzpEZTg%3D%3D';

function readDate({locdate: {_text}}) {
    const year = parseInt(_text.substr(0, 4));
    const month = parseInt(_text.substr(4, 2));
    const day = parseInt(_text.substr(6, 2));
    
    return new Date(year, month - 1, day);
};

async function getHolidays(year, month) {
    const params = {
        year: year.toString(),
        month: month.toString().padStart(2, '0')
    };
    const apiUrl = `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?serviceKey=${ServiceKey}&solYear=${params.year}&solMonth=${params.month}`;

    const { data } = await axios.get(apiUrl);
    const { response: { body: { items: { item } }} } = xml2js(data, {compact: true});
    return item.map(readDate);
};

function isSaturday(date) {
    return date.getDay() === 6;
};

function isSunday(date) {
    return date.getDay() === 0;
};

async function isHoliday(date) {
    const dates = await getHolidays(date.getFullYear(), date.getMonth() + 1);
    return date in dates;
};

async function isWeekday(date) {
    return !(isSaturday(date) || isSunday(date) || await isHoliday(date));
}

export {
    isSaturday,
    isSunday,
    isHoliday, 
    isWeekday
};