angular.module("myApp")
.controller("favoritesController", function ($scope,$http, $window,$location) {
    pointName = "";
    var token = $window.sessionStorage.getItem('vacation-token');
    $scope.$root.favorite = "glyphicon glyphicon-minus-sign";
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
            $scope.sortBy('poiName');
        }).catch(function(response) {
          console.error('Error occurred:', response.status, response.data);
        }).finally(function() {
             console.log("Task Finished.");
        });

    $scope.openPOIPage = function (poiName){
        pointName = poiName.poiName;
        $location.url("/chosenPOI?poiName="+pointName);
    }
    
    $scope.removeFromFavorites = function (poi, index){
        $scope.favorites.splice (index, 1)
        let poiName = poi.poiName;
        $http.delete('http://localhost:3000/users/removeFavoritePOI', {data: {'poiName':poiName},headers: {'x-auth-token': token,'Content-Type': 'application/json;charset=utf-8'}})
        .then(function (response) {
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

      $scope.acceptReview = function(poi, userReview){
        parameters=$location.search()
        dateReview = getDate();
        $http.get('http://localhost:3000/poi/getDetails?poiName='+parameters.poiName)
        .then(function (response){
            ans = response.data;
            console.log("name: " +poi.poiName);
            alert(ans[0].firstReview);
            if (ans[0].firstReview == null){
                console.log("first case if");
                addReview (poi.poiName, userReview, dateReview, 1);
            }
            else if (ans[0].secondReview == ""){
                console.log("second case if");
                addReview (poi.poiName, userReview, dateReview, 2);
            }
            else{
                console.log("third case if");
                if (ans[0].dateFirstReview > ans[0].dateSecondReview){
                    addReview (poi.poiName, userReview, dateReview, 2);
                }
                else{
                    addReview (poi.poiName, userReview, dateReview, 1);
                }
            }},
            function (response) {
                console.error('Error occurred:', response.status, response.data);
            })};

    function addReview  (poiName, userReview, dateReview, index){
        token = $window.sessionStorage.getItem('vacation-token');
        $http({
            method: "PUT",
            url: "http://localhost:3000/poi/addReview",
            headers: {
                'x-auth-token': token
            },
            data: {
                reviewIndex: index,
                review: userReview,
                date: dateReview,
                poiName: poiName
            }
        }).then(function (res) { alert("yahhhhhh!") },
        function (response) { console.error('Error occurred:', response.status, response.data);   });
    }


    function getDate (){
        today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        
        if(dd<10) dd='0'+dd;
        if(mm<10) mm='0'+mm;
        return (mm+"/"+dd+"/"+yyyy);
    };

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
});