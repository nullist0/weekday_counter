import axios from 'axios';
import { format } from 'date-fns';
import { xml2js } from 'xml-js';

const ServiceKey = 'WaaCrB9DoKTrcjXH0w1djKS%2BOpxkxJY1nJ799SzraTyAHiByYdzvy00j3m5sndXjKvkJMQrJwFtPY36LzpEZTg%3D%3D';

function readDate({locdate: {_text}}) {
    const year = parseInt(_text.substr(0, 4));
    const month = parseInt(_text.substr(4, 2));
    const day = parseInt(_text.substr(6, 2));
    
    return new Date(year, month - 1, day);
}

async function getHolidaysIn(month) {
    const params = {
        year: format(month, 'yyyy'),
        month: format(month, 'MM')
    };
    const apiUrl = `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?serviceKey=${ServiceKey}&solYear=${params.year}&solMonth=${params.month}`;

    const { data } = await axios.get(apiUrl);
    const { response: { body: { items: { item } }} } = xml2js(data, {compact: true});
    const items = item ? [item].flat() : undefined;
    return items?.map(readDate) ?? [];
}

export {
    getHolidaysIn
}