class Filter {
    
    constructor(sidebarContainer, taskManager) {
        // reference to the sidebar
        this.sidebarContainer = sidebarContainer;

        // reference to the task manager
        this.taskManager = taskManager;

        // 'this' should point to this class, not to the target element
        this.onFilterSelected = this.onFilterSelected.bind(this);

        // add an event listener (click) for each link in the left sidebar
        this.sidebarContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', this.onFilterSelected);
        });
    }

    /**
     * The 'click' event handler
     * @param {*} event the selected filter
     */
    onFilterSelected(event){
        // the HTML element that was clicked
        const el = event.target;
        // the 'data-id' property of that element
        const filterType = el.dataset.id;
        // removing and adding the 'active' class
        this.sidebarContainer.querySelector('a.active').classList.remove('active');
        el.classList.add('active');

        // properly fill up the tasks array and the page title
        let tasks = [];
        
        switch(filterType){
            case 'filter-important':
                tasks = this.taskManager.important;
                break;
            case 'filter-today':
                tasks = this.taskManager.today;
                break;
            case 'filter-week':
                tasks = this.taskManager.nextWeek;
                break;
            case 'filter-private':
                tasks = this.taskManager.private;
                break;
            case 'filter-shared':
                tasks = this.taskManager.shared;
                break;
            default:
                tasks = this.taskManager.all;
                break;
        }

        // generate a new (custom) event to warn App.js of the change
        document.dispatchEvent(new CustomEvent('filter-selected', {detail: {tasks: tasks}}));
    }

}


