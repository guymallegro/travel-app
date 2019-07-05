angular.module("myApp")
.controller("chosenPOIController", function ($scope,$http, $window) {
    $http.get('http://localhost:3000/poi/getAll').then(function (response){
        ans = response.data;
        let index = ans.findIndex(poi => poi.poiName === pointName);
        $scope.name = ans[index].poiName;
        $scope.description = ans[index].description;
        $scope.rank = ans[index].rank * 20 + "%";
        $scope.see = ans[index].watchedAmount + 1; // plus one
        $scope.poiImage = ans[index].image;
        updateWatches();
        showReviews();
    },function(response) {
      console.error('Error occurred:', response.status, response.data);
    });

<<<<<<< HEAD
    var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2Fwc2FwIiwiaWF0IjoxNTYwODY5Nzg1LCJleHAiOjE1NjA5NTYxODV9.sDuqRNq6tTfkHz-2nyPk_1ILVnbyHO1dv7c2ddjQAgg';
=======
    var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2Fwc2FwIiwiaWF0IjoxNTYyMzMwODg2LCJleHAiOjE1NjI0MTcyODZ9.3J4h-B13X9OUFq-kgty4gJrHyg2smm5rvGgVILTK-eY';
>>>>>>> a79ce8280f5e56c0911144d597bb2344134b9956
    function updateWatches (){
        $http({
            method: "PUT",
            url: "http://localhost:3000/POI/updateSeenAmount",
            headers: {
                'x-auth-token': token
            },
            data: {
<<<<<<< HEAD
                poiName: $scope.name,
                watchedAmount: $scope.see + 1
=======
                poiName: pointName,
                watchedAmount: $scope.see
>>>>>>> a79ce8280f5e56c0911144d597bb2344134b9956
            }
        }).then(function (res) {
            // $window.alert("good");
        }, function (response) {
            // $window.alert("not good");
        });
    }

    function showReviews (){
        $http.get('http://localhost:3000/poi/getDetails', {'poiName': pointName})
        .then(function (response){
        ans = response.data;
        console.log(ans);
        review_1 = ans.firstReview;
    },function(response) {
      console.error('Error occurred:', response.status, response.data);
    });
    }
});