angular.module("myApp")
.controller("homeUsersController", function ($scope,$http,$window) {
    $scope.$root.currentUser=$window.localStorage.getItem('vacation-user-name');
});