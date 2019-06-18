angular.module("myApp")
.controller("homeGuestsController", function ($scope,$http,$location) {
    $http.get('http://localhost:3000/poi/getAll').then(function (response){
        result = response.data;
        var points=[]
        for(i=0;i<result.length;i++) { 
            if (result[i].rank > 3) {
                points.push(result[i]);  
            }
          }
          var randomPositions = []
          $scope.threeRandomPoints=[]

          while(randomPositions.length < 3){
              var r = Math.floor(Math.random()*(points.length-1)) + 1;
              if(randomPositions.indexOf(r) === -1){
                randomPositions.push(r);
                $scope.threeRandomPoints.push(points[r])
              } 
          }
        

    }).catch(function(response) {
      console.error('Error occurred:', response.status, response.data);
    }).finally(function() {
         console.log("Task Finished.");
    });

    $scope.logout = function (){
      currentUser = "Guest";
      $scope.$root.login = false;
      $scope.$root.register = false;
      $scope.$root.logout = false;
      $location.url("/homeGuests");
      $window.sessionStorage.clear();
  }

    function logout (){
      currentUser = "Guest";
      $scope.$root.login = false;
      $scope.$root.register = false;
      $scope.$root.logout = false;
      $location.url("/homeGuests");
      $window.sessionStorage.clear();
  }

    $scope.moveToRegister = function(){
        $location.url("/register")
    }

    $scope.moveToLogin = function(){
        $location.url("/login");
    }

    function clean(value) {
        delete value["description"];
        delete value["image"];
        delete value["dateFirstReview"];
        delete value["firstReview"];
        delete value["dateSecondReview"];
        delete value["secondReview"];
      }
});