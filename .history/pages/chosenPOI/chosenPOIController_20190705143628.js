angular.module("myApp")
.controller("chosenPOIController", function ($scope,$http, $window) {
    $scope.$root.review_1 = "Be the first to write a review on this place";
    $scope.$root.review_2 = "Be the first to write a review on this place";
    $http({
        method: 'GET',
        url: "http://localhost:3000/poi/getPOIDetails",
        body: {
            'poiName': $scope.poiName
        }
      }).then(function successCallback(response) {
        console.log(response);
        $scope.name = ans.poiName;
        $scope.description = ans.description;
        $scope.rank = ans.rank * 20 + "%";
        $scope.see = ans.watchedAmount + 1;
        $scope.poiImage = ans.image;
        updateWatches();
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
      
    $http({
        method: "GET",
        url: "http://localhost:3000/poi/getPOIDetails",
        body: {
            'poiName': $scope.poiName
        })
    .then(function details(response){
        console.log(response);
        $scope.name = ans.poiName;
        $scope.description = ans.description;
        $scope.rank = ans.rank * 20 + "%";
        $scope.see = ans.watchedAmount + 1;
        $scope.poiImage = ans.image;
        // ans = response.data;
        // for (index = 0; index < Object.keys(ans).length; index++){
        //     if (ans[index].poiName === pointName){
        //         break;
        //     }
        // }
        // $scope.poiImage =ans[index].image;
        // $scope.name = ans[index].poiName;
        // $scope.description = ans[index].description;
        // $scope.rank = ans[index].rank * 20 + "%";
        // $scope.see = ans[index].watchedAmount + 1;
        updateWatches();
    }).catch(function(response) {
      console.error('Error occurred:', response.status, response.data);
    }).finally(function() {
         console.log("Task Finished.");
    })  
});

    var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ3V5IiwiaWF0IjoxNTYxOTc5MjIzLCJleHAiOjE1NjIwNjU2MjN9.3dnRHmFCY6VHOVbIxNoHZbWGM6y-3x6zFqydWMoKxeY';
    function updateWatches (){
        $http({
            method: "PUT",
            url: "http://localhost:3000/POI/updateSeenAmount",
            headers: {
                'x-auth-token': token
            },
            data: {
                poiName: $scope.name,
                watchedAmount: $scope.see
            }
        }).then(function (res) {
            // $window.alert("good");
        }, function (response) {
            // $window.alert("not good");
        });
    }
});