angular.module("myApp")
    .controller("homeUsersController", function ($scope, $http, $window, $location) {
        token = $window.sessionStorage.getItem('vacation-token');
        $http({
            method: "POST",
            url: "http://localhost:3000/users/getRecommendation",
            headers: {
                'x-auth-token': token
            }}).then(function (response) {
            ans = response.data;
            console.log(ans);
            $scope.recommend_1 = ans[0];
            $scope.recommend_2 = ans[5];
            setSaved();
        },function (response){
            console.error('Error occurred:', response.status, response.data); });

            function setSaved () {
            existing = $window.localStorage.getItem('vacation-favorites-' + userName)
            existing = existing ? existing.split(',') : [];
            console.log("ex: " + existing);
            console.log("ex[0]: " + existing[0]);

            $scope.saved_1 = existing[0];
            $scope.saved_2 = existing[1];
        }
    });