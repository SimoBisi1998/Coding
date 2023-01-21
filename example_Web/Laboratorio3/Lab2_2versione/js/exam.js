class Exam {
    static counter = 0;
    constructor(date,name,credits,grade) {
        this.id = Exam.counter++;
        this.date = date;
        this.name = name;
        this.credits = credits;
        this.grade = grade;
    }
}