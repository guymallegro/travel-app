angular.module("myApp")
.controller("registerController", function ($scope,$http) {
    $scope.login = function(userName, password){
        $http.post('http://localhost:3000/users/login',{userName:userName,password:password}).then(function (response){
            $window.localStorage.setItem('token-vacation-api',data);
            $scope.$root.token = $window.localStorage.getItem('token-vacation-api');
            $scope.$root.currentUser=userName;
        }).catch(function(response) {
          console.error('Error occurred:', response.status, response.data);
        }).finally(function() {
             console.log("Task Finished.");
        });
    };
});