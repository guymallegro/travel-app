angular.module("myApp")
  .controller("homeGuestsController", function ($scope, $http, $location, $window) {
    $scope.$root.currentUser = "Guest";
    $http.get('http://localhost:3000/poi/getAll').then(function (response) {
    console.log("gues what??");
    result = response.data;
      var points = []
      for (i = 0; i < result.length; i++) {
        if (result[i].rank > 3) {
          points.push(result[i]);
        }
      }
      var randomPositions = []
      $scope.threeRandomPoints = []
      if (points.length <= 3) {
        $scope.threeRandomPoints = points;
      }
      else {
        while (randomPositions.length < 3) {
          var r = Math.floor(Math.random() * (points.length - 1));
          if (randomPositions.indexOf(r) === -1) {
            randomPositions.push(r);
            $scope.threeRandomPoints.push(points[r])
          }
        }
      }

    }).catch(function (response) {
      console.error('Error occurred:', response.status, response.data);
    }).finally(function () {
      console.log("Task Finished.");
    });

    if ($window.sessionStorage.getItem('vacation-token')) {
      $scope.loggedIn = true;
      $scope.currentUser = $window.sessionStorage.getItem('vacation-user-name')
    }
    else {
      $scope.loggedIn = false;
    }


    $scope.openPOIPage = function (poiName) {
      pointName = poiName.poiName;
      $location.url("/chosenPOI?poiName=" + pointName);
    }

    $scope.moveToRegister = function () {
      $location.url("/register")
    }

    $scope.moveToLogin = function () {
      $location.url("/login");
    }

    $scope.logout = function () {
      $window.sessionStorage.clear();
      $scope.currentUser = "Guest";
      $location.url("/homeGuests");
    }

  });