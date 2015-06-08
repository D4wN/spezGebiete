angular.module('myApp', ['ngRoute', 'ui.bootstrap'])
    .config(['$routeProvider', function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'folder.html',
                controller: folderCtrl
            })
            .when('/folder',{
                templateUrl: 'folder.html',
                controller: folderCtrl
            })
            .when('/folder/:name',{
                templateUrl: 'messages.html',
                controller: messageCtrl
            })
            .when('/folder/:name/:msgId',{
                templateUrl: 'oneMessage.html',
                controller: oneMessageCtrl
            })
            .when('/newMessage',{
                templateUrl: 'createmessage.html',
                controller: NewMessageCtrl
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);