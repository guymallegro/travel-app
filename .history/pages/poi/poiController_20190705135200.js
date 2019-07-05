angular.module("myApp")
.controller("poiController", function ($scope,$http, $window, $location) {
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
        else
            removeFromFavorites(pointName);
        
    }

    $scope.openPOIPage = function (poiName){
        pointName = poiName.poiName;
        $location.url("/chosenPOI")
    }

    $scope.favorite = function (poi){
        pointName = poi["poiName"];
        for(var i=0; i< $scope.favorites.length;i++){
            if($scope.favorites[i].poiName == pointName)
            return "glyphicon glyphicon-heart"
        }
        return "glyphicon glyphicon-heart-empty"
    }

    if(token){
        $scope.loggedIn=true;
    }
    else{
        $scope.loggedIn=false;
    }
    function addToFavorites (poiName){
        $http({
            method: "PUT",
            url: "http://localhost:3000/users/addFavoritePOI",
            headers: {
                'x-auth-token': token
            },
            data: {
                poiName: poiName
            }
        }).then(function (res) {
            $window.alert("The point added to favorites successfully!");
            console.log("poi: " + poiName);
            poiName.push(favorite, "glyphicon glyphicon-user")
            $scope.$root.poiName.favorite = "glyphicon glyphicon-user"
            $window.location.reload();
        }, function (response) {
            $window.alert("The point is already saved in your favorites");
        });
    }
    
    function removeFromFavorites(poiName){
        let name = poiName.poiName;
        $http.delete('http://localhost:3000/users/removeFavoritePOI', {headers: {'x-auth-token': token, poiName: name}})
        .then(function (response) {
            $window.alert("The point removed from favorites successfully!");
            $scope.$root.favorite = "glyphicon glyphicon-heart"
            $window.location.reload();
        }, function (response) {
            console.log(response)
        });
    }

    function clean(value) {
        delete value["description"];
        delete value["image"];
        delete value["dateFirstReview"];
        delete value["firstReview"];
        delete value["dateSecondReview"];
        delete value["secondReview"];
      }
      $scope.predicate = function( categoryFilter, searchString ) {
        return function( item ) {
          return ((!searchString || item.poiName.toLowerCase().indexOf(searchString) !== -1) && (!categoryFilter) || item.category === categoryFilter);
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