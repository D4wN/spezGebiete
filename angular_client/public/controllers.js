function IndexCtrl($scope, $http) {
    console.log("index route");
    /*$http.get('localhost:3000').
        success(function(data, status, headers, config) {
            console.log("data:");
            console.log(data);
            $scope.posts = data.posts;
        });*/
}

function folderCtrl($scope, $http, $route){
    console.log("Get Folder...");
    $scope.deleteFolder = function(val){
        $http.delete('http://localhost:3000/folder/delete/'+val).
            success(function(data, status, headers, config) {
                console.log("folderCtrl.delete Success!");
                $route.reload();
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
                $route.reload();
            }).
            error(function(data, status, headers, config) {
                alert("renameFolder.delete Error!");
            });
    }

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

//MESSAGE
function messageCtrl($scope, $http, $route, $routeParams){
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
function oneMessageCtrl($scope, $http, $route, $routeParams, $location){
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
    }

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
function NewMessageCtrl($scope, $http, $location, $routeParams) {
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
}