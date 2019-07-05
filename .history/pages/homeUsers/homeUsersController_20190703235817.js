angular.module("myApp")
.controller("homeUsersController", function ($scope,$window,$location) {
    $scope.logout = function (){
        $scope.$root.currentUser = "Guest";
        $scope.login = false;
        $scope.$root.register = false;
        $scope.$root.logout = false;
        $location.url("/homeGuests");
        $window.sessionStorage.clear();
    }
});