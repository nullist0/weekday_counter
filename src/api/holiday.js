class Holiday {
    constructor(year, month, day) {
        this.year = year;
        this.month = month;
        this.day = day;
    }

    toDate() {
        return new Date(this.year, this.month - 1, this.day);
    }
}

export default Holiday;