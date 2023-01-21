class App {
    constructor(examContainer,sidebarContainer,tableContainer) {
        this.tableContainer = tableContainer;
        this.examContainer = examContainer;
        this.sidebarContainer = sidebarContainer;

        this.examManager = new ExamManager();
        this.exams = this.examManager.exams;

        this.sidebarContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (event) => {
                // the HTML element that was clicked
                const el = event.target;
                // the 'data-id' property of that element
                const filterType = el.dataset.id;
                // removing and adding the 'active' class
                this.sidebarContainer.querySelector('a.active').classList.remove('active');
                el.classList.add('active');

                // what happens to our table when I click on the link
                this.onYearSelected(filterType);
                this.selectedCredits(el.innerText);
                
            });
        });

        this.showExams(this.exams);
    }

    selectedCredits(innerText) {
        let exams  = [];
        let index = 0;
        switch (innerText){
            case '12 Crediti':
                index = 12;
                break;
            case '9 Crediti':
                index = 9;
                break;
            case '6 Crediti':
                index = 6;
                break;
        }
        exams = this.examManager.getByCredits(index);
        this.showExams(exams);
    }
 
    onYearSelected(year) {
        let exams = [];

        // empty the exam table
        if(this.examContainer.innerHTML !== '') {
            this.examContainer.innerHTML = '';
        }

        // properly fill up the exams array
        if(year === 'all') {
            exams = this.exams;
        }
        else {
            exams = this.examManager.getByYear(year);
        }

        // show all the things!
        this.showExams(exams);
    }
    showExams(exams){
        for(let exam of exams){
            const tr = document.createElement('tr');

            const tdData = document.createElement('td');
            tdData.innerText = exam.data;

            const tdNome = document.createElement('td');
            tdNome.innerText = exam.nome;

            const tdCrediti = document.createElement('td');
            tdCrediti.innerText = exam.crediti;

            const tdVoto = document.createElement('td');
            tdVoto.innerText = exam.voto;

            tr.appendChild(tdData);
            tr.appendChild(tdNome);
            tr.appendChild(tdCrediti);
            tr.appendChild(tdVoto);


            this.examContainer.appendChild(tr);
        }
    }
}