import axios from 'axios';
import { eachMonthOfInterval } from 'date-fns';
import isWithinInterval from 'date-fns/isWithinInterval';
import Holiday from './holiday';
import HolidayAPIRequest from './holiday_api_request';

class HerokuHolidayAPI {
    constructor() {
        this._cache = {};
    }

    async _getHolidaysInMonth(holidayAPIRequest, cache) {
        const { year, month } = holidayAPIRequest;
        const requestID = holidayAPIRequest.requestID();
        const apiUrl = `https://shielded-forest-67184.herokuapp.com/holidays/${year}/${month}`;

        if (cache[requestID] === undefined) {
            const { data: { holidays } } = await axios.get(apiUrl);
            cache[requestID] = holidays.map(({ year, month, day }) => new Holiday(year, month, day));
        }
        return cache[requestID];
    }

    async getHolidaysInRange(range) {
        const { start, end } = range;
        const months = eachMonthOfInterval({ start, end });
        const holidayAPIRequests = months.map(month => new HolidayAPIRequest(month));
        const holidayAPIResponses = await Promise.all(holidayAPIRequests.map(request => this._getHolidaysInMonth(request, this._cache)));
        const holidays = holidayAPIResponses.flat();
        
        return holidays
            .map(holiday => holiday.toDate())
            .filter(date => isWithinInterval(date, { start, end }));
    }
}

export default HerokuHolidayAPI;