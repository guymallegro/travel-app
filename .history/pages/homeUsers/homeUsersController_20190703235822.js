angular.module("myApp")
.controller("homeUsersController", function ($scope,$window,$location) {
    $scope.logout = function (){
        $scope.$root.currentUser = "Guest";
        $scope.login = false;
        $scope.register = false;
        $scope.logout = false;
        $location.url("/homeGuests");
        $window.sessionStorage.clear();
    }
});