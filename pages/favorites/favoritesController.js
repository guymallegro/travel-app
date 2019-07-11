angular.module("myApp")
.controller("favoritesController", function ($scope,$http, $window,$location) {
    pointName = "";
    $scope.rankMessage = "";
    var token = $window.sessionStorage.getItem('vacation-token');
    var userName = $window.sessionStorage.getItem('vacation-user-name');
    $scope.$root.favorite = "glyphicon glyphicon-minus-sign";
    $scope.reverse=false;
    $http.get('http://localhost:3000/poi/getAll').then(function (response){
            result = response.data;
            result=deleteNotFavorite(result)
            result.forEach(clean);
            $scope.favorites = result;
            $scope.propertyName = 'rank';
        }).catch(function(response) {
          console.error('Error occurred:', response.status, response.data);
        }).finally(function() {
             console.log("Task Finished.");
        });

    $http({
            method: "POST",
            url: "http://localhost:3000/users/getFavorites",
            headers: {
                'x-auth-token': token
            }
        }).then(function (response){
                $scope.current=response.data;
            }).catch(function(response) {
              console.error('Error occurred:', response.status, response.data);
            }).finally(function() {
                 console.log("Task Finished.");
            });


    $scope.openPOIPage = function (poiName){
        pointName = poiName.poiName;
        $location.url("/chosenPOI?poiName="+pointName);
    }

    $scope.setPOIName = function (poiName, index){
        pointName = poiName.poiName;
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
        existing = $window.localStorage.getItem('vacation-favorites-' + userName)
        existing = existing ? existing.split(',') : [];
        $scope.$root.favoritesNumber=existing.length;
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
        afterOrder=[]
        for(var i=0;i<favorites.length;i++){
            for(var j=0;j<points.length;j++){
                if(points[j].poiName == favorites[i]){
                    afterOrder.push(points[j])
                    break;
                }
            }
        }
        return afterOrder;
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

    $scope.objectKeys = function(obj){
        return Object.keys(obj);
      }
    
    $scope.saveOrder = function(){
        tableJson = JSON.parse(angular.toJson($scope.filteredPois))
        newOrder=[]
        for(var i=0;i<tableJson.length;i++){
            name=tableJson[i].poiName
            newOrder.push(name)
        }
        $window.localStorage.setItem('vacation-favorites-'+userName, newOrder.toString());
    }
    $scope.sort = function (column) {
        if(column=="category" || column=="poiName"){
            $scope.favorites.sort(function(a, b){
                if(a[column] < b[column]) return -1;
                if(a[column] > b[column]) return 1;
                return 0;
              });
        } 
        else
            $scope.favorites.sort((a, b) => b[column] - a[column]);
    }

      $scope.acceptReview = function(userReview){
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

    $scope.saveFavoritePoints = function(){
        for(var i=0;i<$scope.favorites.length;i++){
            found=false;
            for(var j=0;j<$scope.current.length;j++){
                if($scope.favorites[i].poiName == $scope.current[j].poiName){
                    found=true;
                    break;
                }
            }
            if(!found){
            $http({
                method: "PUT",
                url: "http://localhost:3000/users/addFavoritePOI",
                headers: {
                    'x-auth-token': token
                },
                data: {
                    poiName: $scope.favorites[i].poiName
                }
            }).then(function (res) {
            }, function (response) {
            });
        }
        }

        for(var i=0;i<$scope.current.length;i++){
            found=false;
            for(var j=0;j<$scope.favorites.length;j++){
                if($scope.favorites[j].poiName == $scope.current[i].poiName){
                    found=true;
                    break;
                }
            }
            if(!found){
                $http.delete('http://localhost:3000/users/removeFavoritePOI', {data: {'poiName':$scope.current[i].poiName},headers: {'x-auth-token': token,'Content-Type': 'application/json;charset=utf-8'}})
                .then(function (response) {
                }, function (response) {
                    console.log(response)
                });
        }
        }
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
});