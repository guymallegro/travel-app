angular.module("myApp")
.controller("poiController", function ($scope,$http, $window, $location) {
    var token = $window.sessionStorage.getItem('vacation-token');
    var userName = $window.sessionStorage.getItem('vacation-user-name');
    if(token){
        $scope.loggedIn=true;
    }
    else{
        $scope.loggedIn=false;
    }
    pointName = "";
    $scope.favorite = "glyphicon glyphicon-heart-empty";
    $http.get('http://localhost:3000/poi/getAll').then(function (response){
        result = response.data;
        result.forEach(clean);
        $scope.pois = result;
        $scope.reverse = true;
        $scope.propertyName = 'poiName';
        $scope.sortBy('poiName');
    }).catch(function(response){
      console.error('Error occurred:', response.status, response.data);
    }).finally(function() {
         console.log("Task Finished.");
    });
    tempFavorites = $window.localStorage.getItem('vacation-favorites-'+userName)
    $scope.favorites = tempFavorites ? tempFavorites.split(',') : [];

    $scope.manageFavorites = function(poi,heart){
        pointName = poi.poiName;
        if (heart === "glyphicon glyphicon-heart-empty"){
            addToFavorites(pointName);
            $window.alert("The point was added to the favorites successfully!");
            location.reload();
        }
        else{
            removeFromFavorites(pointName);
            $window.alert("The point was removed from the favorites successfully!");
            location.reload();
        }
    }
    $scope.openPOIPage = function (poiName){
        pointName = poiName.poiName;
        $location.url("/chosenPOI?poiName="+pointName);
    }

    $scope.favorite = function (poi){
        pointName = poi["poiName"];
        if($scope.favorites){
            for(var i=0; i< $scope.favorites.length;i++){
                if($scope.favorites[i] == pointName)
                return "glyphicon glyphicon-heart";
            }
        }
        return "glyphicon glyphicon-heart-empty";
    }
    
    function addToFavorites (poiName){
        existing = $window.localStorage.getItem('vacation-favorites-'+userName)
        existing = existing ? existing.split(',') : [];
        existing.push(poiName);
        $window.localStorage.setItem('vacation-favorites-'+userName, existing.toString());
    }
    
    function removeFromFavorites(poiName){
        existing = $window.localStorage.getItem('vacation-favorites-'+userName)
        existing = existing ? existing.split(',') : [];
        var index = existing.indexOf(poiName);
        if (index > -1) {
           existing.splice(index, 1);
        }
        $window.localStorage.setItem('vacation-favorites-'+userName, existing.toString());
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