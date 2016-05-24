var TodoApp;
(function (TodoApp) {
    angular.module('TodoApp', ['ngRoute', 'ngResource', 'ui.bootstrap']).config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
            templateUrl: '/ngApp/views/todo.html',
            controller: TodoApp.Controllers.todoController,
            controllerAs: 'vm'
        });
        $locationProvider.html5Mode(true);
    });
})(TodoApp || (TodoApp = {}));
/// <reference path="ngapp/app.ts" /> 
var TodoApp;
(function (TodoApp) {
    var Controllers;
    (function (Controllers) {
        var todoController = (function () {
            function todoController(todoService, $uibModal) {
                var _this = this;
                this.todoService = todoService;
                this.$uibModal = $uibModal;
                this.todos = [];
                this.todoService.getTodos().then(function (data) {
                    _this.todos = data;
                    _this.prepareViewModels();
                });
            }
            todoController.prototype.prepareViewModels = function () {
                //Parse dates as strings for display, check for fake dates, check if overdue, and define showDetails property:
                for (var i = 0; i < this.todos.length; i++) {
                    var deadline = new Date(this.todos[i].Deadline);
                    var breakoff = new Date(1800, 1, 1);
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
            };
            todoController.prototype.addTodo = function () {
                this.$uibModal.open({
                    templateUrl: 'ngApp/views/newTodoModal.html',
                    controller: TodoApp.Controllers.newTodoController,
                    controllerAs: 'vm',
                    backdrop: 'static',
                });
            };
            todoController.prototype.deleteTodo = function (id) {
                this.todoService.deleteTodo(id).then(function () {
                    window.location.reload();
                });
            };
            todoController.prototype.editTodo = function (index) {
                //Get clicked todo by index and pass it to the newTodoController.  Open modal and load values into the input fields.
            };
            todoController.prototype.toggleCompleted = function (index) {
                if (this.todos[index].Completed) {
                    this.todos[index].Completed = false;
                }
                else {
                    this.todos[index].Completed = true;
                }
                this.updateTodo(this.todos[index]);
            };
            todoController.prototype.toggleDetails = function (index) {
                if (this.todos[index].showDetails) {
                    this.todos[index].showDetails = false;
                }
                else {
                    this.todos[index].showDetails = true;
                }
            };
            todoController.prototype.updateTodo = function (todo) {
                this.todoService.addOrUpdateTodo(todo).then(function () {
                    window.location.reload();
                });
            };
            return todoController;
        })();
        Controllers.todoController = todoController;
        var newTodoController = (function () {
            function newTodoController(todoService, $uibModalInstance) {
                this.todoService = todoService;
                this.$uibModalInstance = $uibModalInstance;
                this.showErrorMessage = false;
                //Define todo view model:
                this.todo = {};
                this.todo.title = "";
                this.todo.deadline = new Date();
                this.todo.completed = false;
                this.todo.details = "";
            }
            newTodoController.prototype.createTodo = function () {
                this.todoService.addOrUpdateTodo(this.todo).then(function () {
                    window.location.reload();
                });
            };
            newTodoController.prototype.closeModal = function () {
                this.$uibModalInstance.close();
            };
            return newTodoController;
        })();
        Controllers.newTodoController = newTodoController;
    })(Controllers = TodoApp.Controllers || (TodoApp.Controllers = {}));
})(TodoApp || (TodoApp = {}));
var TodoApp;
(function (TodoApp) {
    var Services;
    (function (Services) {
        var todoService = (function () {
            function todoService($resource) {
                this.$resource = $resource;
                this.todoResource = $resource('api/todo/:id', null, {
                    addOrUpdateTodo: {
                        url: "/api/todo/addOrUpdateTodo",
                        method: "POST"
                    },
                    delete: {
                        url: "/api/todo/delete",
                        method: "DELETE"
                    },
                });
            }
            todoService.prototype.getTodos = function () {
                return this.todoResource.query().$promise;
            };
            todoService.prototype.addOrUpdateTodo = function (todo) {
                return this.todoResource.addOrUpdateTodo(todo).$promise;
            };
            todoService.prototype.deleteTodo = function (id) {
                return this.todoResource.delete({ id: id }).$promise;
            };
            return todoService;
        })();
        Services.todoService = todoService;
        angular.module('TodoApp').service('todoService', todoService);
    })(Services = TodoApp.Services || (TodoApp.Services = {}));
})(TodoApp || (TodoApp = {}));
//# sourceMappingURL=master.js.map