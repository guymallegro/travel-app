angular.module("myApp")
    .controller("homeUsersController", function ($scope, $http, $window, $location) {
        var userName = $window.sessionStorage.getItem('vacation-user-name');
        var token = $window.sessionStorage.getItem('vacation-token');
        $http({
            method: "POST",
            url: "http://localhost:3000/users/getRecommendation",
            headers: {
                'x-auth-token': token
            }
        }).then(function (response) {
            ans = response.data;
            console.log(ans);
            $scope.recommend_1 = ans[0];
            $scope.recommend_2 = ans[5];
            setSaved();
        }, function (response) {
            console.error('Error occurred:', response.status, response.data);
        });

        function setSaved() {
            existing = $window.localStorage.getItem('vacation-favorites-' + userName)
            existing = existing ? existing.split(',') : [];
            console.log("ex: " + existing);
            console.log("ex[0]: " + existing[0]);

            $scope.saved_1 = existing[0];
            $scope.saved_2 = existing[1];
        }

        function getSavedPOIImages() {
            $http.get('http://localhost:3000/poi/getAll')
            .then(function (response) {
                result = response.data;
                var points = []
                for (i = 0; i < result.length; i++) {
                    if (result[i].rank > 3) {
                        points.push(result[i]);
                    }
                }
                var randomPositions = []
                $scope.threeRandomPoints = []
                if (points.length <= 3) {
                    $scope.threeRandomPoints = points;
                }
                else {
                    while (randomPositions.length < 3) {
                        var r = Math.floor(Math.random() * (points.length - 1));
                        if (randomPositions.indexOf(r) === -1) {
                            randomPositions.push(r);
                            $scope.threeRandomPoints.push(points[r])
                        }
                    }
                }
            }
        }
    });