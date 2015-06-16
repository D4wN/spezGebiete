var myApp = angular.module('myApp', ['ngRoute', 'ionic'])
    .controller('myAppMessageController', function ($scope, $http, $route, $routeParams) {
        $scope.folderName = undefined;
        //$scope.orderData = '_id';
        $scope.limitMessages = 5;

        //PAGING
        $scope.limitMessagesMore = function(){
            $scope.limitMessages += 25;
            console.log("LimitMore: " + $scope.limitMessages);
        }

        $scope.limitMessagesLess = function(){
            if($scope.limitMessages > 25){
                $scope.limitMessages -= 25;
            }
            console.log("LimitLess: " + $scope.limitMessages);
        }

        //DELETE
        $scope.deleteMessage = function (val) {
            $http.delete('http://localhost:3000/folder/' + $scope.folderName + '/message/' + val + '/delete').
                success(function (data, status, headers, config) {
                    console.log("folderCtrl.delete Success!");
                    //$route.reload();
                    $scope.getMessages();
                }).
                error(function (data, status, headers, config) {
                    alert("folderCtrl.delete Error!");
                });
        }

        //SHOW ALL MESSAGES FROM FOLDER
        $scope.getMessages = function () {
            if ($scope.folderName === undefined) {
                alert("folderName undefined");
                return;
            }

            $http.get('http://localhost:3000/folder/' + $scope.folderName + '/message').
                success(function (data, status, headers, config) {
                    console.log("Success! Messages");
                    console.log(data);
                    $scope.messageList = data;
                }).
                error(function (data, status, headers, config) {
                    alert("Error!");
                });
        }
        //MOVE
        $scope.moveMessage = function (mId, newFolder) {

            console.log('http://localhost:3000/folder/' + $scope.folderName + '/message/' + mId + '    TO: ' + newFolder);

            var data = {
                '_id': newFolder
            };

            //No 'Access-Control-Allow-Origin' header is present on the requested resource. --> Weil $scope._id undefined ist/war
            //Server sucht im Übergebenen Content nach dem Element '_id'
            $http.put('http://localhost:3000/folder/' + $scope.folderName + '/message/' + mId, data).
                success(function (data, status, headers, config) {
                    console.log("move Folder Success!");
                    //$location.path('folder/'+ $scope.chose._id);
                    $scope.getMessages();
                }).
                error(function (data, status, headers, config) {
                    alert("move Folder Error!");
                });
        };

        $scope.getFolder = function () {
            $http.get('http://localhost:3000/folder/').
                success(function (data, status, headers, config) {
                    console.log("Success! Folder");
                    console.log(data);
                    $scope.folderList = data;
                    $scope.chose = $scope.folderList[0];
                }).
                error(function (data, status, headers, config) {
                    alert("Error!");
                });
        }

        //WATCHER FOR MESSAGES
        $scope.$watch('folderName', function () {
            if ($scope.isCollapsed && $scope.folderName != undefined) {
                $scope.getMessages();
                $scope.getFolder();
                //console.log("isCollapsed1: " + $scope.isCollapsed)
            }
        });

        $scope.$watch('isCollapsed', function () {
            if ($scope.isCollapsed && $scope.folderName != undefined) {
                $scope.getMessages();
                $scope.getFolder();
                //console.log("isCollapsed2: " + $scope.isCollapsed)
            }
        });
    })
    .controller('myAppOneMessageController', function ($scope, $http, $route, $routeParams, $location) {
        $scope.parentFolder = undefined;
        $scope.mId = undefined;

        //DELETE
        /*$scope.deleteMessage = function(){
         $http.delete('http://localhost:3000/folder/'+ $scope.parentFolder +'/message/'+ $scope.msg._id +'/delete').
         success(function(data, status, headers, config) {
         console.log("folderCtrl.delete Success!");
         $location.path('/folder/'+ $scope.parentFolder);
         }).
         error(function(data, status, headers, config) {
         alert("folderCtrl.delete Error!");
         });
         };*/

        //GET MESSAGE
        $scope.getMessageDetails = function () {
            $http.get('http://localhost:3000/folder/' + $scope.parentFolder + '/message/' + $scope.mId).
                success(function (data, status, headers, config) {
                    console.log("Success! Messages");
                    console.log(data);
                    $scope.msg = data;
                }).
                error(function (data, status, headers, config) {
                    alert("Error!");
                });
        }

        //WATCHER FOR MESSAGES
        $scope.$watch('parentFolder', function () {
            if ($scope.isCollapsed && $scope.parentFolder != undefined && $scope.mId != undefined) {
                $scope.getMessageDetails();
            }
        });

        $scope.$watch('isCollapsed', function () {
            if ($scope.isCollapsed && $scope.parentFolder != undefined && $scope.mId != undefined) {
                $scope.getMessageDetails();
            }
        });

        //init, get folder list
        $http.get('http://localhost:3000/folder/').
            success(function (data, status, headers, config) {
                console.log("Success! Folder");
                console.log(data);
                $scope.folderList = data;
                $scope.chose = $scope.folderList[0];

            }).
            error(function (data, status, headers, config) {
                alert("Error!");
            });
    })
    .controller('NewMessageCtrl', function ($scope, $http, $timeout, $mdSidenav, $log) {
        $scope.form = {};
        $scope.errorMessage = "";

        //SIDENAV
        $scope.close = function () {
            $mdSidenav('right').close()
                .then(function () {
                    $scope.createNewMessage($scope.form);
                });
        };

        $scope.createNewMessage = function (data) {
            console.log("DATA:");
            console.log(data);

            if (data == null || data === undefined) return;
            $http.post('http://localhost:3000/newMessage', data).
                success(function (data) {
                    //$location.path('/');
                    console.log("SUCCESS! -> new MEssage submitPost");
                    $scope.errorMessage = "";
                    $scope.form.chose = "";
                    $scope.form.newText = "";
                })
                .error(function (err) {
                    $scope.errorMessage = "Could not create new Message!";
                });
        };
    })

.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/')

        $stateProvider.state('main', {
            url: '/main',
            views: {
                main: {
                    //template: '<p>Hello, world!</p>'
                    templateUrl: '../templates/main.html',
                    controller: folderCtrl
                }
            }
        })

        $stateProvider.state('message', {
            url: '/message',
            views: {
                message: {
                    templateUrl: '../templates/createmessage.html',
                    controller: NewMessageCtrl
                }
            }
        })

    });

/*
    .config(['$routeProvider', function ($stateProvider, $urlRouterProviderr) {
        $routeProvider
            .when('/', {
                templateUrl: 'main.html',
                controller: folderCtrl
            })
            .when('/folder', {
                templateUrl: 'main.html',
                controller: folderCtrl
            })
            .when('/newMessage', {
                templateUrl: 'createmessage.html',
                controller: NewMessageCtrl
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);*/