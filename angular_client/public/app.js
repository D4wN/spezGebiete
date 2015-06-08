var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap'])
    .controller('myAppMessageController', function($scope, $http, $route, $routeParams){
        $scope.folderName = undefined;
        //$scope.isCollapsed = true;

        //$scope.toggleColapse = function(){
        //    $scope.isCollapsed = !$scope.isCollapsed;
        //}

        //DELETE
        $scope.deleteMessage = function(val){
            $http.delete('http://localhost:3000/folder/'+ $scope.folderName +'/message/'+ val +'/delete').
                success(function(data, status, headers, config) {
                    console.log("folderCtrl.delete Success!");
                    $route.reload();
                }).
                error(function(data, status, headers, config) {
                    alert("folderCtrl.delete Error!");
                });
        }

        //SHOW ALL MESSAGES FROM FOLDER
        $scope.getMessages = function(){
            $http.get('http://localhost:3000/folder/'+ $scope.folderName +'/message').
                success(function(data, status, headers, config) {
                    console.log("Success! Messages");
                    console.log(data);
                    $scope.messageList = data;
                }).
                error(function(data, status, headers, config) {
                    alert("Error!");
                });
        }

        //WATCHER FOR MESSAGES
        $scope.$watch('fName', function(){
            if(!$scope.isCollapsed && $scope.folderName != undefined){
                $scope.getMessages();
            }
        });

        $scope.$watch('isCollapsed', function(){
            if(!$scope.isCollapsed && $scope.folderName != undefined){
                $scope.getMessages();
            }
        });




    })


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