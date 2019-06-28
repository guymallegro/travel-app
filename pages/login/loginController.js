angular.module("myApp")
.controller("loginController", function ($window,$scope,$http,$location) {
    $scope.login = function(userName, password){
        $http.post('http://localhost:3000/users/login',{userName:userName,password:password}).then(function (response){
            $scope.$root.login = true;
            $scope.$root.register = true;
            $scope.$root.logout = true;
            $window.sessionStorage.setItem('vacation-token', response.data);
            $window.sessionStorage.setItem('vacation-user-name',userName);
            $scope.$root.currentUser=userName;
            $scope.$root.newUser = false;
            $location.url("/homeUsers")
        }).catch(function(response) {
          console.error('Error occurred:', response.status, response.data);
        }).finally(function() {
             console.log("Task Finished.");
        });
    };
});
