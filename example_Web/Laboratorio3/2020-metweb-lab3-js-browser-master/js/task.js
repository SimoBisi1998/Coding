class Task{

    static counter = 1;
    
    constructor(description, important, privateTask, deadline, project) {
        this.id = Task.counter++;
        this.description = description;
        this.important = important;
        this.privateTask = privateTask;

        if(deadline)
            this.deadline = moment(deadline);
        if(project)
            this.project = project;
    }
}

