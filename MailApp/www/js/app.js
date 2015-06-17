var NewMessageCtrl = function ($scope, $http, $state, $log){
    $scope.form = {};
    $scope.errorMessage = "";

    $scope.createNewMessage = function (data) {
        console.log("DATA:");
        console.log($scope.form);

        if ($scope.form.chose == null || $scope.form.chose === undefined) return;
        $http.post('http://localhost:3000/newMessage', $scope.form).
            success(function (data) {
                //$location.path('/');
                console.log("SUCCESS! -> new MEssage submitPost");
                $scope.errorMessage = "";
                $scope.form.chose = "";
                $scope.form.newText = "";

                $state.go('main' , {updated: true});
            })
            .error(function (err) {
                $scope.errorMessage = "Could not create new Message!";
            });
    };
}

var folderCtrl = function($scope, $http, $ionicActionSheet, $stateParams){
    //Ionic
    $scope.listCanSwipe = true;
    $scope.opt = function(id) {
        console.log('Opt: ' + id);
    };

    if($stateParams.updated == true){
        console.log("ALERT");
        $stateParams.updated = false;
    }


    //OLD STUFF
    console.log("Get Folder...");
    $scope.deleteFolder = function(val){
        $http.delete('http://localhost:3000/folder/delete/'+val).
            success(function(data, status, headers, config) {
                console.log("folderCtrl.delete Success!");
                //$route.reload();
                $scope.getFolder();
            }).
            error(function(data, status, headers, config) {
                alert("folderCtrl.delete Error!");
            });
    }
    $scope.renameFolder = function(val, newName){
        if(newName === undefined) return;
        if(newName == val) return;

        $http.put('http://localhost:3000/folder/'+val+'/'+newName).
            success(function(data, status, headers, config) {
                console.log("renameFolder.delete Success!");
                //$route.reload();
                $scope.getFolder();
            }).
            error(function(data, status, headers, config) {
                alert("renameFolder.delete Error!");
            });
    }

    $scope.getFolder = function(){
        $http.get('http://localhost:3000/folder').
            success(function(data, status, headers, config) {
                console.log("Success!");
                console.log(data);
                $scope.folderList = data;
            }).
            error(function(data, status, headers, config) {
                alert("Error!");
            });
    }

    // $ionicActionSheet
    // Triggered on a button click, or some other target
    $scope.show = function(folderId) {

        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
            // Elements |----------------------------------------------------------------------------------------------
            titleText: 'Options of ' +folderId ,
            destructiveText: 'Delete',
            cancelText: 'Cancel',

            // Functions |----------------------------------------------------------------------------------------------
            cancel: function() {
                // add cancel code..
            },
            destructiveButtonClicked: function(){
                console.log("Will delete " + folderId);
                $scope.deleteFolder(folderId);
                return true;
            }
        });
    };

    //init
    $scope.getFolder();
}

var myApp = angular.module('myApp', ['ionic'])
    .controller('myAppMessageController', function ($scope, $http) {
        $scope.folderName = undefined;
        //$scope.orderData = '_id';
        $scope.limitMessages = 5;

        //PAGING
        $scope.limitMessagesMore = function () {
            $scope.limitMessages += 25;
            console.log("LimitMore: " + $scope.limitMessages);
        }

        $scope.limitMessagesLess = function () {
            if ($scope.limitMessages > 25) {
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
    .controller('myAppOneMessageController', function ($scope, $http, $location) {
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
    .controller('NewMessageCtrl', NewMessageCtrl)
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/')

        $stateProvider.state('main', {
            url: '/main',
            views: {
                main: {
                    //template: '<p>Hello, world!</p>'
                    templateUrl: '../templates/main.html',
                    controller: folderCtrl,
                    params: {
                        updated: false
                    }
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

