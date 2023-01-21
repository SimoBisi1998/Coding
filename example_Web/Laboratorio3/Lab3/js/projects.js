class Project {
    constructor(projectContainer,taskManager,sidebarContainer){
        this.projectContainer = projectContainer;
        this.taskManager = taskManager;
        this.sidebarContainer = sidebarContainer;

        this.onProjectSelected = this.onProjectSelected.bind(this);

    }

    createAllProjects() {
        for(const project of this.taskManager.projects){
            const projectNode = this.createProjectNode(project);
            this.projectContainer.appendChild(projectNode);
        }
    }

    createProjectNode(project) {
        const a = document.createElement('a');
        a.className = 'list-group-item list-group-item-action';
        a.innerText = project;
        a.dataset.id = project;
        a.href = '#';
        a.title = project;
        a.addEventListener('click', this.onProjectSelected);
        return a;
    }

    onProjectSelected(event) {
        const el = event.target;

        this.sidebarContainer.querySelector('a.active').classList.remove('active');
        el.classList.add('active');
        const projectName = el.dataset.id;

        document.dispatchEvent(new CustomEvent('filter-selected', {detail: {tasks: this.taskManager.getByProject(projectName), title: projectName + ' - Tutti'}}));

    }

}
