angular.module("myApp")
.controller("chosenPOIController", function ($scope,$http, $window) {
    $http.get('http://localhost:3000/poi/getAll').then(function (response){
        ans = response.data;
        for (index = 0; index < Object.keys(ans).length; index++){
            if (ans[index].poiName === pointName){
                break;
            }
        }
        $scope.name = ans[index].poiName;
        $scope.description = ans[index].description;
        $scope.rank = ans[index].rank * 20 + "%";
        $scope.see = ans[index].watchedAmount; // plus one
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
                poiName: ans[index].poiName,
                watchedAmount: $scope.see + 1
            }
        }).then(function (res) {
            // $window.alert("good");
        }, function (response) {
            // $window.alert("not good");
        });
    }
});