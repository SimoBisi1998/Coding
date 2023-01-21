class Exam {
    static counter = 0;
    constructor(data,nome,crediti,voto) {
        this.id = Exam.counter++;
        this.data = data;
        this.nome = nome;
        this.crediti = crediti;
        this.voto = voto;
    }
}