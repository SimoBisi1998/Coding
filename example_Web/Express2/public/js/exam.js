class Exam {

    constructor(code, name, credits, date, score) {
        this.code = code;
        this.name = name;
        this.credits = credits;
        this.date = moment(date);
        this.score = score;
    }

    static from(json) {
        const e = Object.assign(new Exam(),json);
        e.date = moment(e.date);
        return e;
    }
}

export default Exam;