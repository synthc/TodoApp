namespace TodoApp {

    angular.module('TodoApp', ['ngRoute', 'ngResource', 'ui.bootstrap']).config(($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider) => {
        $routeProvider
            //.when('/', {
            //    templateUrl: '/ngApp/views/home.html',
            //})
            .when('/', {
                templateUrl: '/ngApp/views/todo.html',
                controller: TodoApp.Controllers.todoController,
                controllerAs: 'vm'
            })

        $locationProvider.html5Mode(true);
    });

}