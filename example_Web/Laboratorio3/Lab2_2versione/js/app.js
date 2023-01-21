class App {
    constructor(examContainer,sidebarContainer) {
        this.sidebarContainer = sidebarContainer;
        this.examContainer = examContainer;

        this.examManager = new ExamManager();
        this.exams = this.examManager.exams;

        this.onYearSelected = this.onYearSelected.bind(this);

        this.sidebarContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click',this.onYearSelected);
        }); 
        this.showExams(this.exams);
    }

    showExams(exams) {
        for(let exam of exams) {
            const tr = document.createElement('tr');

            const tdDate = document.createElement('td');
            tdDate.innerText = exam.date;

            const tdName = document.createElement('td');
            tdName.innerText = exam.name;

            const tdCredits= document.createElement('td');
            tdCredits.innerText = exam.credits;

            const tdGrade = document.createElement('td');
            tdGrade.innerText = exam.grade;

            tr.appendChild(tdDate);
            tr.appendChild(tdName);
            tr.appendChild(tdCredits);
            tr.appendChild(tdGrade);
            this.examContainer.appendChild(tr);
        }
    }

    onYearSelected(event) {
        let exams = [];

        // empty the exam table
        if(this.examContainer.innerHTML !== '') {
            this.examContainer.innerHTML = '';
        }

        const el = event.target;
        const filterType = el.dataset.id;

        this.sidebarContainer.querySelector('a.active').classList.remove('active');
        el.classList.add('active');

        if(filterType === 'all') {
            exams = this.exams;
        }
        else {
            exams = this.examManager.getByYear(filterType);
        }

        // show all the things!
        this.showExams(exams);
    }
}