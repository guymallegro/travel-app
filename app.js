let app = angular.module('myApp', ["ngRoute"]);

// config routes
app.config(function($routeProvider,$windowProvider)  {
    var $window = $windowProvider.$get();
    if($window.localStorage.getItem('vacation-token')){
        newUser=false;
    }
    else{
        newUser=true;
    }
    $routeProvider
        // homepage
        .when('/', {
            templateUrl: function() {
                return newUser == true ? 'pages/homeGuests/homeGuests.html' : 'pages/homeUsers/homeUsers.html';
              },

        })
        .when('/homeGuests', {
            // this is a template
            templateUrl: 'pages/homeGuests/homeGuests.html',
            controller : 'homeGuestsController as abtCtrl'
        })
        .when('/homeUsers', {
            // this is a template
            templateUrl: 'pages/homeUsers/homeUsers.html',
            controller : 'homeUsersController as abtCtrl'
        })
        // about
        .when('/about', {
            // this is a template url
            templateUrl: 'pages/about/about.html',
            controller : 'aboutController as abtCtrl'
        })
        // poi
        .when('/poi', {
            templateUrl: 'pages/poi/poi.html',
            controller : 'poiController as poiCtrl'
        }).when('/login', {
            templateUrl: 'pages/login/login.html',
            controller : 'loginController as poiCtrl'
        })
        .when('/register', {
            templateUrl: 'pages/register/register.html',
            controller : 'registerController as poiCtrl'
        })
        // other
        .otherwise({ redirectTo: '/' });
});