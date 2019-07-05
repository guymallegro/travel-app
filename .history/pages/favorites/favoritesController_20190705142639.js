angular.module("myApp")
.controller("favoritesController", function ($scope,$http, $window,$location) {
    pointName = "";
    var token = $window.sessionStorage.getItem('vacation-token');
    $scope.$root.favorite = "glyphicon glyphicon-heart";
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
            $scope.reverse = true;
            $scope.propertyName = 'poiName';
            $scope.isQVisible=true;
        }).catch(function(response) {
          console.error('Error occurred:', response.status, response.data);
        }).finally(function() {
             console.log("Task Finished.");
        });

    $scope.manageFavorites = function(poiName){
        if ($scope.$root.favorite === "glyphicon glyphicon-heart")
            addToFavorites(poiName);
        else
            removeFromFavorites(poiName);
        
    }

    $scope.openPOIPage = function (poiName){
        pointName = poiName.poiName;
        console.log("problemmm:" + pointName)
        $location.url("/chosenPOI")
    }

    var token = $window.sessionStorage.getItem('vacation-token');
    function addToFavorites (poiName){
        $http({
            method: "PUT",
            url: "http://localhost:3000/users/addFavoritePOI",
            headers: {
                'x-auth-token': token
            },
            data: {
                poiName: poiName.poiName,
            }
        }).then(function (res) {
            $window.alert("The point added to favorites successfully!");
            $scope.$root.favorite = "glyphicon glyphicon-user"
        }, function (response) {
            $window.alert("The point is already saved in your favorites");
        });
    }
    
    function removeFromFavorites(poiName){
        let name = poiName.poiName;
        let pname = 'poiName';
        console.log(poiName.poiName);
        console.log('pname: ' + pname);

        var data = {poiName: poiName}
        $http.delete('http://localhost:3000/users/removeFavoritePOI', {headers: {'x-auth-token': token, poiName: name}})
        .then(function (response) {
            $window.alert("The point removed from favorites successfully!");
            $scope.$root.favorite = "glyphicon glyphicon-heart"
        }, function (response) {
            console.log(response)
        });
    }

    function clean(value) {
        delete value["description"];
        delete value["point"];
        delete value["userName"];
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