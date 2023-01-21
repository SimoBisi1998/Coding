class TaskManager {
    constructor(){
        this.tasks = [];

        this.init();
    }

    /**
     * Build the task list
     */
    init() {
        this.tasks.push(
            new Task('Completare Lab 3',true, false, '2020-05-18T16:00:00', 'UPO'),
            new Task('Guardare Mr. Robot', false, true, '2020-05-10T18:59:00', 'Personale'),
            new Task('Fare una passeggiata', true, true, '2020-05-11T08:00:00', 'Personale')
        );
    }

    /**
     * Get all the tasks
     */
    get all() {
        return this.tasks;
    }

    /**
     * Get important tasks
     */
    get important() {
        return this.tasks.filter((el) => {
            return el.important;
        });
    }

    /**
     * Get the tasks of today
     */
    get today() {
        return this.tasks.filter((el) => {
            if(el.deadline)
                return this.isToday(el.deadline);
            else
                return false;
        });
    }

    /**
     * Get the tasks of the next week
     */
    get nextWeek() {
        return this.tasks.filter((el) => {
            if(el.deadline)
                return this.isNextWeek(el.deadline);
            else
                return false;
        });
    }

    /**
     * Get the private taks
     */
    get private() {
        return this.tasks.filter((el) => {
            return el.privateTask;
        });
    }

    /**
     * Get the shared tasks
     */
    get shared() {
        return this.tasks.filter((el) => {
            return !el.privateTask;
        });
    }

    /**
     * Get all the projects
     */
    get projects() {

        const projects = [];
        for(const task of this.tasks){
            if(task.project && !projects.includes(task.project))
                projects.push(task.project);
        }

        return projects;
        //Alternative
        //return [...new Set(this.tasks.map(task => task.project))];
    }

    /**
     * Get all the tasks of a given project
     * 
     * @param {*} project the given project
     */
    getByProject(project) {
        return this.tasks.filter((el) => {
            return el.project === project;
        });
    }

    /**
     * Add a task
     * 
     * @param {*} task the Task to be added
     */
    addTask(task) {
        this.tasks.push(task);
    }


    /**
     * Function to check if a date is today. Returns true if the date is today, false otherwise.
     * @param {*} date a Moment js date to be checked
     */
    isToday(date) {
        return date.isSame(moment(), 'day');
    }

    /**
     * Function to check if a date is in the next week. Returns true if the date is in the next week, false otherwise.
     * @param {*} date a Moment js Date to be checked
     */
    isNextWeek(date) {
        const nextWeek = moment().add(1, 'weeks');
        const tomorrow = moment().add(1, 'days');
        return date.isAfter(tomorrow) && date.isBefore(nextWeek);
    }
}