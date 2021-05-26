import format from 'date-fns/format';

function getKey(date) {
    return format(date, 'yyyy/MM');
}

export default class HolidayCache {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.cache = {};
    }

    getHolidaysIn = async (month) => {
        const key = getKey(month);
        if (!(key in Object.keys(this.cache))) {
            this.cache[key] = await this.dataSource.getHolidaysIn(month);
        }
        return this.cache[key];
    }
}