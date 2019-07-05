angular.module("myApp")
.controller("loginController", function ($window,$scope,$http,$location) {
    $scope.login = function(userName, password){
        $http.post('http://localhost:3000/users/login',{userName:userName,password:password}).then(function (response){
            $window.sessionStorage.setItem('vacation-token', response.data);
            $window.sessionStorage.setItem('vacation-user-name',userName);
            $window.location.reload();
            $scope.$root.logout = true;
            $scope.$root.newUser = false;
        }).catch(function(response) {
          console.error('Error occurred:', response.status, response.data);
        }).finally(function() {
             console.log("Task Finished.");
        });
    };
    
});

