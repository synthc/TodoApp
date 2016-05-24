namespace TodoApp.Services {

    export class todoService {
        public todoResource;

        constructor(private $resource: ng.resource.IResourceService) {
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

        public getTodos() {
            return this.todoResource.query().$promise;
        }

        public addOrUpdateTodo(todo) {
            return this.todoResource.addOrUpdateTodo(todo).$promise;
        }

        public deleteTodo(id: number) {
            return this.todoResource.delete({ id: id }).$promise;
        }
    }

    angular.module('TodoApp').service('todoService', todoService);
}