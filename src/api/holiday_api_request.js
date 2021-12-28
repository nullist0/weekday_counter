class HolidayAPIRequest {
    constructor(date) {
        this.year = date.getFullYear().toString();
        this.month = (date.getMonth() + 1).toString().padStart(2, "0");
    }

    requestID() {
        return this.year + this.month;
    }
}

export default HolidayAPIRequest;