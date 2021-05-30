export default class Month {
    constructor(date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        this.year = year.toString();
        this.month = month.toString().padStart(2, '0');
    }

    toString() {
        return this.year + this.month;
    }
}