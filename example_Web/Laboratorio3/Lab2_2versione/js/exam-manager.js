class ExamManager {
    constructor() {
        this.exams = [];

        this.buildMyExam();
    }

    buildMyExam() {
        this.exams.push(
            new Exam(moment("2020-02-01","YYYY-MM-DD"),"Algoritmi 1",12,"28"),
            new Exam(moment("2020-02-06","YYYY-MM-DD"),"Basi di Dati e Sistemi Informativi",9,"23"),
            new Exam(moment("2020-02-15","YYYY-MM-DD"),"Programmazione 1",9,"30L"),
            new Exam(moment("2019-09-10","YYYY-MM-DD"),"Sistemi Operativi",6,"26"),
        );
    }

    getByYear(year) {
        return this.exams.filter(exam => exam.date.isBetween(year+'-01-01',year+'-12-31'));
    }

}