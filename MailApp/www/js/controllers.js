var folderCtrl = function($scope, $http, $ionicSideMenuDelegate, $log){
    //Ionic
    $scope.listCanSwipe = true;
    $scope.opt = function(id) {
        console.log('Opt: ' + id);
    };

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

    //init
    $scope.getFolder();
}