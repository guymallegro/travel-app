angular.module("myApp")
.controller("favoritesController", function ($scope,$http, $window,$location) {
    pointName = "";
    $scope.rankMessage = "";
    var token = $window.sessionStorage.getItem('vacation-token');
    var userName = $window.sessionStorage.getItem('vacation-user-name');
    $scope.$root.favorite = "glyphicon glyphicon-minus-sign";
    $http.get('http://localhost:3000/poi/getAll').then(function (response){
            result = response.data;
            deleteNotFavorite(result)
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

    $scope.setPOIName = function (index){
        pointName = $scope.favorites[index].poiName;
    }
    
    $scope.removeFromFavorites = function (poi,index){
        poiName=poi.poiName;
        existing = $window.localStorage.getItem('vacation-favorites-'+userName)
        existing = existing ? existing.split(',') : [];
        $scope.favorites.splice (index, 1)
        var index = existing.indexOf(poiName);
        if (index > -1) {
           existing.splice(index, 1);

        }
        $window.localStorage.setItem('vacation-favorites-'+userName, existing.toString());
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

    function deleteNotFavorite(points){
        favorites = $window.localStorage.getItem('vacation-favorites-'+userName)
        favorites = favorites ? favorites.split(',') : [];
        var i=0;
        while(i<points.length){
            if(!favorites.includes(points[i].poiName)){
                points.splice(i,1)
            }
            else{
                i++;
            }
        }
    }

    $scope.setRank = function (userRank){
        token = $window.sessionStorage.getItem('vacation-token');
        $http({
            method: "PUT",
            url: "http://localhost:3000/users/rankPOI",
            headers: {
                'x-auth-token': token
            },
            data: {
                rank: userRank,
                poiName: pointName
            }
        }).then(function (res) { $scope.rankMessage ="your rank: " + userRank },
        function (response) { console.error('Error occurred:', response.status, response.data);   });
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

      $scope.acceptReview = function(userReview){
        var index = $scope.favorites.indexOf(pointName);
        pointName = $scope.favorites[index].poiName;
        dateReview = getDate();
        $http.get('http://localhost:3000/poi/getDetails?poiName='+pointName)
        .then(function (response){
            ans = response.data;
            if (ans[0].firstReview == null){
                addReview (userReview, dateReview, 1);
            }
            else if (ans[0].secondReview == null){
                addReview (userReview, dateReview, 2);
            }
            else{
                if (ans[0].dateFirstReview > ans[0].dateSecondReview){
                    addReview (userReview, dateReview, 1);
                }
                else{
                    addReview (userReview, dateReview, 2);
                }
            }
        },
            function (response) {
                console.error('Error occurred:', response.status, response.data);
            })};

    function addReview  (userReview, dateReview, index){
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
                poiName: pointName
            }
        }).then(function (res) { },
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