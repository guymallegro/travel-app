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
    },function(response) {
      console.error('Error occurred:', response.status, response.data);
    });

    var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2Fwc2FwIiwiaWF0IjoxNTYyMzMwODg2LCJleHAiOjE1NjI0MTcyODZ9.3J4h-B13X9OUFq-kgty4gJrHyg2smm5rvGgVILTK-eY';
    function updateWatches (){
        $http({
            method: "PUT",
            url: "http://localhost:3000/POI/updateSeenAmount",
            headers: {
                'x-auth-token': token
            },
            data: {
                poiName: pointName,
                watchedAmount: $scope.see
            }
        }).then(function (res) {
            // $window.alert("good");
        }, function (response) {
            // $window.alert("not good");
        });
    }
});