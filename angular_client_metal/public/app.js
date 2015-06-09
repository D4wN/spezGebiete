var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial'])
    .controller('myAppMessageController', function($scope, $http, $route, $routeParams){
        $scope.folderName = undefined;

        //DELETE
        $scope.deleteMessage = function(val){
            $http.delete('http://localhost:3000/folder/'+ $scope.folderName +'/message/'+ val +'/delete').
                success(function(data, status, headers, config) {
                    console.log("folderCtrl.delete Success!");
                    //$route.reload();
                    $scope.getMessages();
                }).
                error(function(data, status, headers, config) {
                    alert("folderCtrl.delete Error!");
                });
        }

        //SHOW ALL MESSAGES FROM FOLDER
        $scope.getMessages = function(){
            if($scope.folderName === undefined){
                alert("folderName undefined");
                return;
            }

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
        //MOVE
        $scope.moveMessage = function(mId, newFolder){
            console.log('http://localhost:3000/folder/'+ $scope.folderName +'/message/'+ mId + '    TO: ' + newFolder);
            alert("SIEHE TODO!");
            //TODO move funktioniert nicht ->  No 'Access-Control-Allow-Origin' header is present on the requested resource.
            return; //FIXME @ NICLAS
            $http.put('http://localhost:3000/folder/'+ $scope.folderName +'/message/'+ mId, newFolder).
                success(function(data, status, headers, config) {
                    console.log("move Folder Success!");
                    //$location.path('folder/'+ $scope.chose._id);
                    $scope.getMessages();
                }).
                error(function(data, status, headers, config) {
                    alert("move Folder Error!");
                });
        };

        $scope.getFolder = function(){
            $http.get('http://localhost:3000/folder/').
                success(function(data, status, headers, config) {
                    console.log("Success! Folder");
                    console.log(data);
                    $scope.folderList = data;
                    $scope.chose = $scope.folderList[0];
                }).
                error(function(data, status, headers, config) {
                    alert("Error!");
                });
        }

        //WATCHER FOR MESSAGES
        $scope.$watch('folderName', function(){
            if(!$scope.isCollapsed && $scope.folderName != undefined){
                $scope.getMessages();
                $scope.getFolder();
            }
        });

        $scope.$watch('isCollapsed', function(){
            if(!$scope.isCollapsed && $scope.folderName != undefined){
                $scope.getMessages();
                $scope.getFolder();
            }
        });
    })
    .controller('myAppOneMessageController', function($scope, $http, $route, $routeParams, $location){
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
        $scope.getMessageDetails = function(){
            $http.get('http://localhost:3000/folder/'+ $scope.parentFolder +'/message/'+ $scope.mId).
                success(function(data, status, headers, config) {
                    console.log("Success! Messages");
                    console.log(data);
                    $scope.msg = data;
                }).
                error(function(data, status, headers, config) {
                    alert("Error!");
                });
        }

        //WATCHER FOR MESSAGES
        $scope.$watch('parentFolder', function(){
            if(!$scope.isCollapsed && $scope.parentFolder != undefined && $scope.mId != undefined){
                $scope.getMessageDetails();
            }
        });

        $scope.$watch('isCollapsed', function(){
            if(!$scope.isCollapsed && $scope.parentFolder != undefined && $scope.mId != undefined){
                $scope.getMessageDetails();
            }
        });

        //init, get folder list
        $http.get('http://localhost:3000/folder/').
            success(function(data, status, headers, config) {
                console.log("Success! Folder");
                console.log(data);
                $scope.folderList = data;
                $scope.chose = $scope.folderList[0];

            }).
            error(function(data, status, headers, config) {
                alert("Error!");
            });
    })
    .controller('NewMessageCtrl', function($scope, $http, $modalInstance){
        $scope.form = {};

        /*$http.get('http://localhost:3000/folder/').
            success(function(data) {
                $scope.data = data;
            });*/

        $scope.ok = function (){
            console.log("OK MODAL");
            $modalInstance.close($scope.form);
        };

        $scope.cancel = function (){
            console.log("cancel MODAL");
            $modalInstance.dismiss('cancel');
        };
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