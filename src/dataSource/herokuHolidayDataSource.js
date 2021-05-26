import axios from 'axios';
import { format } from 'date-fns';

function readDate(dateString) {
    const year = parseInt(dateString.substr(0, 4));
    const month = parseInt(dateString.substr(4, 2));
    const day = parseInt(dateString.substr(6, 2));
    
    return new Date(year, month - 1, day);
}

async function getHolidaysIn(month) {
    const params = {
        year: format(month, 'yyyy'),
        month: format(month, 'MM')
    };
    const apiUrl = `https://shielded-forest-67184.herokuapp.com/holidays?year=${params.year}&month=${params.month}`;
    const { data: { dates } } = await axios.get(apiUrl);
    
    return dates.map(readDate);
}

export {
    getHolidaysIn
}