angular.module("myApp")
.controller("chosenPOIController", function ($scope,$http,$location) {
    parameters=$location.search()
    $http.get('http://localhost:3000/poi/getDetails?poiName='+parameters.poiName).then(function (response){
        ans = response.data;
        $scope.description = ans[0].description;
        $scope.rank = ans[0].rank * 20 + "%";
        $scope.see = ans["0"].watchedAmount + 1;
        $scope.poiImage = ans[0].image;
        $scope.review_1 = ans[0].firstReview;
        $scope.reviewDate_1 = ans[0].dateFirstReview;
        $scope.review_2 = ans[0].secondReview;
        updateWatches($scope.see,parameters.poiName);
    },function(response) {
      console.error('Error occurred:', response.status, response.data);
    });

    var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ3V5IiwiaWF0IjoxNTYyNDI0OTgwLCJleHAiOjE1NjI1MTEzODB9.RUZ2G3VOZVX4l70qop49OcmUIkjwJBvAo4tryAvMKiA';
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
        }).then(function (res) {
            // $window.alert("good");
        }, function (response) {
            // $window.alert("not good");
        });
    }
});