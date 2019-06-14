angular.module("myApp")
.controller("poiController", function ($scope,$http) {
    $http.get('http://localhost:3000/poi/getAll').then(function (response){
        result = response.data;
        result.forEach(clean);
        $scope.pois = result;
        
    }).catch(function(response) {
      console.error('Error occurred:', response.status, response.data);
    }).finally(function() {
         console.log("Task Finished.");
    });

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