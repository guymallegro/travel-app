angular.module("myApp")
.controller("loginController", function ($window,$scope,$http,$location) {
    $scope.login = function(userName, password){
        $http.post('http://localhost:3000/users/login',{userName:userName,password:password}).then(function (response){
            $window.sessionStorage.setItem('vacation-token', response.data);
            $window.sessionStorage.setItem('vacation-user-name',userName);
            $scope.$root.loggedIn=true;
            $location.url("/homeUsers");
            location.reload();
            $scope.$root.currentUser=userName;
            existing = $window.localStorage.getItem('vacation-favorites-' + userName)
            existing = existing ? existing.split(',') : [];
            $scope.$root.favoritesNumber=existing.length;
        }).catch(function(response) {
          console.error('Error occurred:', response.status, response.data);
        }).finally(function() {
             console.log("Task Finished.");
        });
    };
    
});

