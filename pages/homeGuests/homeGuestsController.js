angular.module("myApp")
.controller("homeGuestsController", function ($scope,$http,$window,$location) {
    $scope.moveToRegister = function(){
        $location.url("/register")
    }

    $scope.moveToLogin = function(){
        $location.url("/login")
    }
});