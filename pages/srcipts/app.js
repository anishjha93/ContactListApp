var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http){
    var refresh=function(){
        $http({
            method:'GET',
            url:'/contactList'
        }).then(function successCallBack(response) {
            $scope.contactList1=response.data;
        }, function errorCallBack(response){
            alert(response);
        });
    };

    refresh();
    $scope.AddDetails=function(){
        $http({
            method:'POST',
            url:'/contactList',
            data:$scope.contact
        }).then(function successCallBack(response) {
            refresh();
            $scope.contact="";
        });
    }

    $scope.remove=function(id){
        console.log(id);
        $http({
            method:'DELETE',
            url:'/contactList/'+id
        }).then(function successCallBack(response) {
            refresh();
        }, function errorCallBack(response){
            alert(response);
        });
    };

    $scope.Edit=function(id){
        $http({
            method:'GET',
            url:'/contactList/'+id
        }).then(function successCallBack(response) {
            //alert(response);
            $scope.contact=response.data;
        },function errorCallBack(response) {
            alert("Error");
        });
        console.log(id);
    };

    $scope.Update=function(){
        $http({
            method:'PUT',
            url:'/contactList/'+$scope.contact._id,
            data:$scope.contact
        }).then(function successCallBack(response) {
            refresh();
            $scope.contact="";
        },function errorCallBack(response) {

        });
    };
});