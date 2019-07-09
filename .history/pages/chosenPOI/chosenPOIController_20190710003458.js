angular.module("myApp")
.controller("chosenPOIController", function ($scope,$http,$location) {
    parameters=$location.search()
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

    var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2Fwc2FwIiwiaWF0IjoxNTYyNTE5MTA1LCJleHAiOjE1NjI2MDU1MDV9.lYaC7UNigoAJ7uTfz_0cO-prXwuZtay1zlJ7l4-gk2M';
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
        console.log("poiName: " + poiName);
        existing = $window.localStorage.getItem('vacation-favorites-'+userName)
        existing = existing ? existing.split(',') : [];
        existing.push(poiName);
        $window.localStorage.setItem('vacation-favorites-'+userName, existing.toString());
    }

});