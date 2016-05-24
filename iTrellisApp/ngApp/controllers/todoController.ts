namespace TodoApp.Controllers {

    export class todoController {
        public todos = [];
        public todo;

        constructor(private todoService: TodoApp.Services.todoService, private $uibModal: angular.ui.bootstrap.IModalService) {
            this.todoService.getTodos().then((data) => {
                this.todos = data;
                this.prepareViewModels();
            });
        }

        private prepareViewModels() {
            //Parse dates as strings for display, check for fake dates, check if overdue, and define showDetails property:
            for (let i = 0; i < this.todos.length; i++) {
                let deadline = new Date(this.todos[i].Deadline);
                let breakoff = new Date(1800, 1, 1)

                if (deadline < breakoff) {
                    this.todos[i].Deadline = null;
                }
                else {
                    this.todos[i].year = deadline.getFullYear();
                    this.todos[i].month = deadline.getMonth() + 1;
                    this.todos[i].day = deadline.getDate();

                    //If not completed and deadline was before current date:
                    if (!this.todos[i].Completed && (deadline < new Date(Date.now()))) {
                        this.todos[i].overdue = "overdue";
                    }
                    else {
                        this.todos[i].overdue = "not_overdue";
                    }
                }

                this.todos[i].showDetails = false;
            }
        }

        public addTodo() {
            this.$uibModal.open({
                templateUrl: 'ngApp/views/newTodoModal.html',
                controller: TodoApp.Controllers.newTodoController,
                controllerAs: 'vm',
                backdrop: 'static',
            })
        }

        public deleteTodo(id: number) {
            this.todoService.deleteTodo(id).then(() => {
                window.location.reload();
            });
        }

        public editTodo(index: number) {
            //Get clicked todo by index and pass it to the newTodoController.  Open modal and load values into the input fields.
        }

        public toggleCompleted(index: number) {
            if (this.todos[index].Completed) {
                this.todos[index].Completed = false;
            }
            else {
                this.todos[index].Completed = true;
            }

            this.updateTodo(this.todos[index]);
        }

        public toggleDetails(index: number) {
            if (this.todos[index].showDetails) {
                this.todos[index].showDetails = false;
            }
            else {
                this.todos[index].showDetails = true;
            }
        }

        private updateTodo(todo) {
            this.todoService.addOrUpdateTodo(todo).then(() => {
                window.location.reload();
            });
        }

    }

    export class newTodoController {
        public todo;
        public showErrorMessage = false;

        constructor(private todoService: TodoApp.Services.todoService, private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance) {
            //Define todo view model:
            this.todo = {};
            this.todo.title = "";
            this.todo.deadline = new Date();
            this.todo.completed = false;
            this.todo.details = "";
        }

        public createTodo() {
            this.todoService.addOrUpdateTodo(this.todo).then(() => {
                window.location.reload();
            });
        }

        public closeModal() {
            this.$uibModalInstance.close();
        }
    }

}