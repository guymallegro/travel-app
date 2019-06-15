angular.module("myApp")
.controller("registerController", function ($scope,$http,$location) {
    $http.get('http://localhost:3000/POI/getCategories').then(function (response){
        $scope.interests=response.data;
    }).catch(function(response) {
      console.error('Error occurred:', response.status, response.data);
    }).finally(function() {
         console.log("Task Finished.");
    });

    $scope.register = function(userName, password, firstName, lastName, country, city, email, firstQuestion, secondQuestion, firstAnswer, secondAnswer, firstInterest, secondInterest){
        $http.post('http://localhost:3000/users/register',{userName:userName,password:password, firstName:firstName, lastName:lastName, country:country, city:city, email:email, firstQuestion:firstQuestion, secondQuestion:secondQuestion, firstAnswer:firstAnswer, secondAnswer:secondAnswer, firstInterest:firstInterest, secondInterest:secondInterest}).then(function (response){
            $location.url("/login")
    }).catch(function(response) {
          console.error('Error occurred:', response.status, response.data);
        }).finally(function() {
             console.log("Task Finished.");
        });
    };

    $scope.countries=["Australia","Bolivia","China","Denemark","Israel","Latvia","Monaco","August","Norway","Panama","Switzerland","USA"]
    $scope.firstQuestions=["What is your middle name?", "What is your favorite book?"]
    $scope.secondQuestions=["What was your firsts pet name?", "What is your favorite book?"]
});