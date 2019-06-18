angular.module("myApp")
.controller("loginController", function ($window,$scope,$http,$location) {
    $scope.login = function(userName, password){
        $http.post('http://localhost:3000/users/login',{userName:userName,password:password}).then(function (response){
            $scope.$root.login = true;
            $scope.$root.register = true;
            $scope.$root.logout = false;
            $window.sessionStorage.setItem('vacation-token', response.data);
            $window.sessionStorage.setItem('vacation-user-name',userName);
            currentUser=userName;
            $location.url("/homeUsers")
        }).catch(function(response) {
          console.error('Error occurred:', response.status, response.data);
        }).finally(function() {
             console.log("Task Finished.");
        });
    };
});
