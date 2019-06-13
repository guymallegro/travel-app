angular.module("myApp")
.controller("poiController", function ($scope,$http) {
    self = this;
    $http.get('http://localhost:3000/hello').then(function(response){
        $scope.myWelcome=response.data;
    });
});