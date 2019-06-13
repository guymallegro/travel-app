angular.module("myApp")
.controller("poiController", function ($scope,$http) {
    self = this;
    $http.get('http://localhost:3000/poi/getAll')		.then(function (response){
        $scope.jsondata = response.data;
        console.log("status:" + response.status);
    }).catch(function(response) {
      console.error('Error occurred:', response.status, response.data);
    }).finally(function() {
         console.log("Task Finished.");
    });
});