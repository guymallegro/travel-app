angular.module("myApp")
.controller("forgotPasswordController", function ($scope,$http,$window) {
    $scope.getQuestions = function(userName){
        $http.post('http://localhost:3000/users/getRestoreQuestions',{userName:userName}).then(function (response){
            $scope.firstQuestion=response.data[0].firstQuestion;
            $scope.secondQuestion=response.data[0].secondQuestion;
            $scope.isQVisible=true;
        }).catch(function(response) {
          console.error('Error occurred:', response.status, response.data);
        }).finally(function() {
             console.log("Task Finished.");
        });
    };

    $scope.sendAnswers = function(userName,firstAnswer, secondAnswer){
        $http.post('http://localhost:3000/users/verifyAnswer',{userName:userName,firstAnswer:firstAnswer,secondAnswer:secondAnswer}).then(function (response){
            $scope.isPasswordVisible=true;
            $scope.password=response.data[0].password;
        }).catch(function(response) {
          console.error('Error occurred:', response.status, response.data);
        }).finally(function() {
             console.log("Task Finished.");
        });
    }
});