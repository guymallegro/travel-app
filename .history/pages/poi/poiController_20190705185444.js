angular.module("myApp")
.controller("poiController", function ($scope,$http, $window, $location) {
    let favor = true;
    pointName = "";
    $scope.favorite = "glyphicon glyphicon-heart-empty";
    $http.get('http://localhost:3000/poi/getAll').then(function (response){
        result = response.data;
        result.forEach(clean);
        $scope.pois = result;
        $scope.reverse = true;
        $scope.propertyName = 'poiName';
    }).catch(function(response) {
      console.error('Error occurred:', response.status, response.data);
    }).finally(function() {
         console.log("Task Finished.");
    });

    var token = $window.sessionStorage.getItem('vacation-token');
    if(token){
    $http({
        method: "POST",
        url: "http://localhost:3000/users/getFavorites",
        headers: {
            'x-auth-token': token
        }
    }).then(function (response){
            result = response.data;
            result.forEach(clean);
            $scope.favorites = result;
        }).catch(function(response) {
          console.error('Error occurred:', response.status, response.data);
        }).finally(function() {
             console.log("Task Finished.");
        });
    }

    $scope.manageFavorites = function(poi,heart){
        pointName = poi.poiName;
        if (heart === "glyphicon glyphicon-heart-empty")
            addToFavorites(pointName);
        else{
            removeFromFavorites(pointName);
        }

    

    function clean(value) {
        delete value["description"];
        delete value["image"];
        delete value["dateFirstReview"];
        delete value["firstReview"];
        delete value["dateSecondReview"];
        delete value["secondReview"];
      }
      $scope.predicate = function( categoryFilter ) {
        return function( item ) {
          return !categoryFilter || item.category === categoryFilter;
        };
      };

      $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
      };
});
app.filter('unique', function () {

  return function (items, filterOn) {

      
      if (filterOn === false) {
          return items;
      }

      if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
          var hashCheck = {}, newItems = [];

          var extractValueToCompare = function (item) {
              if (angular.isObject(item) && angular.isString(filterOn)) {
                  return item[filterOn];
              } else {
                  return item;
              }
          };

          angular.forEach(items, function (item) {
              var valueToCheck, isDuplicate = false;

              for (var i = 0; i < newItems.length; i++) {
                  if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                      isDuplicate = true;
                      break;
                  }
              }
              if (!isDuplicate) {
                  newItems.push(item);
              }

          });
          items = newItems;
      }
      return items;
  };
});