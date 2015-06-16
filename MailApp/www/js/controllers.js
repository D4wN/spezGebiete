var IndexCtrl = function($scope, $http) {
    console.log("index route");
    /*$http.get('localhost:3000').
        success(function(data, status, headers, config) {
            console.log("data:");
            console.log(data);
            $scope.posts = data.posts;
        });*/
}

var folderCtrl = function($scope, $http, $route, $timeout, $log){
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

    //SIDENAV KRAM
    $scope.toggleRight = buildToggler('right');
    function buildToggler(navID) {
/*        var debounceFn =  $mdUtil.debounce(function(){
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    //$log.debug("toggle " + navID + " is done");
                    console.log("toggle " + navID + " is done");
                });
        },300);
        return debounceFn;*/
    }

    //init
    $scope.getFolder();
}

//MESSAGE
var messageCtrl = function($scope, $http, $route, $routeParams){
    $scope.folderName = $routeParams.name;

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

    //SHOW ALL MESSAGES FROM FOLDER X
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

//ONE MESSAGE
var oneMessageCtrl = function($scope, $http, $route, $routeParams, $location, $modal){
    $scope.folderName = $routeParams.name;

    //DELETE
    $scope.deleteMessage = function(){
        $http.delete('http://localhost:3000/folder/'+ $scope.folderName +'/message/'+ $scope.msg._id +'/delete').
            success(function(data, status, headers, config) {
                console.log("folderCtrl.delete Success!");
                $location.path('/folder/'+ $scope.folderName);
            }).
            error(function(data, status, headers, config) {
                alert("folderCtrl.delete Error!");
            });
    };
    //MOVE
    $scope.moveMessage = function(){
        console.log('http://localhost:3000/folder/'+ $scope.chose._id);
        $http.put('http://localhost:3000/folder/'+ $scope.folderName +'/message/'+ $scope.msg._id, $scope.chose).
            success(function(data, status, headers, config) {
                console.log("move Folder Success!");
                $location.path('folder/'+ $scope.chose._id);
            }).
            error(function(data, status, headers, config) {
                alert("move Folder Error!");
            });
    };

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

    $http.get('http://localhost:3000/folder/'+ $scope.folderName +'/message/'+ $routeParams.msgId).
        success(function(data, status, headers, config) {
            console.log("Success! Messages");
            console.log(data);
            $scope.msg = data;
        }).
        error(function(data, status, headers, config) {
            alert("Error!");
        });
}

//NEW MESSAGE
var NewMessageCtrl = function($scope, $http, $location, $routeParams){
    $scope.form = {};

    $http.get('http://localhost:3000/folder/').
        success(function(data) {
            $scope.data = data;
        });

    $scope.submitPost = function () {
        console.log($scope.form);
        $http.post('http://localhost:3000/newMessage', $scope.form).
            success(function(data) {
                $location.path('/');
            });
    };

    $scope.ok = function (){
        console.log("OK MODAL");
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function (){
        console.log("cancel MODAL");
        $modalInstance.dismiss('cancel');
    };
}