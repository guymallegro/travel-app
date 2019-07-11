angular.module("myApp")
.controller("chosenPOIController", function ($scope,$http,$location, $window) {
    parameters=$location.search();
    var userName = $window.sessionStorage.getItem('vacation-user-name');
    $http.get('http://localhost:3000/poi/getDetails?poiName='+parameters.poiName).then(function (response){
        ans = response.data;
        $scope.description = ans[0].description;
        $scope.name = parameters.poiName;
        $scope.rank = ans[0].rank * 20 + "%";
        $scope.see = ans[0].watchedAmount + 1;
        $scope.poiImage = ans[0].image;
        if (ans[0].firstReview == null){
            $scope.review_1 = "Be the first to add a review"    
        }
        else{
            $scope.review_1 = ans[0].firstReview;
        }
        $scope.reviewDate_1 = ans[0].dateFirstReview;
        $scope.review_2 = ans[0].secondReview;
        $scope.reviewDate_2 = ans[0].dateSecondReview;
        updateWatches($scope.see,parameters.poiName);
    },function(response) {
      console.error('Error occurred:', response.status, response.data);
    });

    var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2Fwc2FwIiwiaWF0IjoxNTYyODY2MjM4LCJleHAiOjE1NjI5NTI2Mzh9.YYXcd13jNRuMeyf-BrWcfveMEfsvfMyWst1bDJfufCI';
    function updateWatches (see,name){
        $http({
            method: "PUT",
            url: "http://localhost:3000/POI/updateSeenAmount",
            headers: {
                'x-auth-token': token
            },
            data: {
                poiName: name,
                watchedAmount: see
            }
        }).then(function (res) { },
        function (response) {    });
    }

    $scope.addToFavorites = function (poiName){
        existing = $window.localStorage.getItem('vacation-favorites-'+userName)
        existing = existing ? existing.split(',') : [];
        existing.push(poiName);
        $window.localStorage.setItem('vacation-favorites-'+userName, existing.toString());
    }

});