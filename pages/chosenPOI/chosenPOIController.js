angular.module("myApp")
.controller("chosenPOIController", function ($scope,$http, $window) {
    $http.get('http://localhost:3000/poi/getAll').then(function (response){
        ans = response.data;
        let index = ans.findIndex(poi => poi.poiName === pointName);
        $scope.name = ans[index].poiName;
        $scope.description = ans[index].description;
        $scope.rank = ans[index].rank * 20 + "%";
        $scope.see = ans[index].watchedAmount + 1;
        updateWatches();
    }).catch(function(response) {
      console.error('Error occurred:', response.status, response.data);
    }).finally(function() {
         console.log("Task Finished.");
    });

    var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdCIsImlhdCI6MTU2MTcyNzc0NSwiZXhwIjoxNTYxODE0MTQ1fQ.pscZKPgUBlykosewaA1TDu_qQOSI9B_45aIOMAw8eB8';
    function updateWatches (){
        $http({
            method: "PUT",
            url: "http://localhost:3000/POI/updateSeenAmount",
            headers: {
                'x-auth-token': token
            },
            data: {
                poiName: $scope.name,
                watchedAmount: $scope.see + 1
            }
        }).then(function (res) {
            // $window.alert("good");
        }, function (response) {
            // $window.alert("not good");
        });
    }
});