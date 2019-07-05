angular.module("myApp")
.controller("homeGuestsController", function ($scope,$http,$location,$window) {
  $scope.$root.login = true;
  $scope.$root.register = true;
  // $scope.$root.logout = false;
  $scope.$root.currentUser = "Guest";
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

    if($window.sessionStorage.getItem('vacation-token')){
      $scope.loggedIn=true;
      $scope.currentUser=$window.sessionStorage.getItem('vacation-user-name')

  }
  else{
      $scope.loggedIn=false;
  }

  
  
  $scope.openPOIPage = function (poiName){
    pointName = poiName.poiName;
    $location.url("/chosenPOI")
}

    $scope.moveToRegister = function(){
        $location.url("/register")
    }

    $scope.moveToLogin = function(){
        $location.url("/login");
    }

    $scope.logout = function (){
        $scope.$root.currentUser = "Guest";
        $scope.$root.login = true;
        $scope.$root.register = false;
        $scope.$root.logout = false;
        $location.url("/homeGuests");
        $window.sessionStorage.clear();
    }
    
});