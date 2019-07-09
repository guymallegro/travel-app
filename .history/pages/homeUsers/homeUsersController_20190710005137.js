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

        function getSavedPOIImages(poi_1, poi_2) {
            $http.get('http://localhost:3000/poi/getAll')
            .then(function (response) {
                result = response.data;
                let index_1 = result.findIndex( poi1 => record.poiName === poi_1 );
                let index_2 = result.findIndex( poi2 => record.poiName === poi_2 );
                $scope.saved_1 = result[index_1];
                $scope.saved_2 = result[index_2];
            }, function (response) {
                console.error('Error occurred:', response.status, response.data);
            }
        }
    });