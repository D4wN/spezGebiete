angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
    config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'templates/index',
                controller: IndexCtrl
            }).
            when('/newMessage', { //newMessage
                templateUrl: 'templates/addPost',
                controller: AddPostCtrl
            }).
            when('/folder/:name/message/:id', { //readMessage
                templateUrl: 'templates/readPost',
                controller: ReadPostCtrl
            }).
            when('/editPost/:id', {
                templateUrl: 'templates/editPost',
                controller: EditPostCtrl
            }).
            when('/deletePost/:id', {
                templateUrl: 'templates/deletePost',
                controller: DeletePostCtrl
            }).
            otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);
    }]);