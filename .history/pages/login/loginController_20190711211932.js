angular.module("myApp")
.controller("loginController", function ($window,$scope,$http,$location) {
    var token = $window.sessionStorage.getItem('vacation-token');
    if(token){
        $location.url("/homeUsers");
    }
    $scope.login = function(userName, password){
        $http.post('http://localhost:3000/users/login',{userName:userName,password:password}).then(function (response){
            $window.sessionStorage.setItem('vacation-token', response.data);
            $window.sessionStorage.setItem('vacation-user-name',userName);
            $scope.$root.loggedIn=true;
            $location.url("/homeUsers");
            $scope.$root.currentUser=userName;
            location.reload();
        }).catch(function(response) {
            $scope.incorrect = "The given password/username is incorrect. pleasr try again";
          console.error('Error occurred:', response.status, response.data);
        }).finally(function() {
             console.log("Task Finished.");
        });
    };
    
});

