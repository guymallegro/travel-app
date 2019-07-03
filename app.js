let app = angular.module('myApp', ["ngRoute"]);

// config routes
app.config(function($routeProvider,$windowProvider)  {
    var $window = $windowProvider.$get();
    if($window.sessionStorage.getItem('vacation-token')){
        newUser=true;
    }
    else{
        newUser=false;
    }

    $routeProvider
        .when('/', {
            templateUrl: function() {
                return newUser == false ? 'pages/homeGuests/homeGuests.html' : 'pages/homeUsers/homeUsers.html';
              },
            controller: function() {
                return newUser == false ? 'homeGuestsController as abtCtrl' : 'homeUsersController as abtCtrl';
              },
        }).when('/homeGuests', {
            templateUrl: 'pages/homeGuests/homeGuests.html',
            controller : 'homeGuestsController as abtCtrl'
        }).when('/homeUsers', {
            templateUrl: 'pages/homeUsers/homeUsers.html',
            controller : 'homeUsersController as abtCtrl'
        }).when('/about', {
            templateUrl: 'pages/about/about.html',
            controller : 'aboutController as abtCtrl'
        }).when('/chosenPOI', {
            templateUrl: 'pages/chosenPOI/chosenPOI.html',
            controller : 'chosenPOIController as cpoiCtrl'
        }).when('/forgotPassword', {
            templateUrl: 'pages/forgotPassword/forgotPassword.html',
            controller : 'forgotPasswordController as abtCtrl'
        }).when('/poi', {
            templateUrl: 'pages/poi/poi.html',
            controller : 'poiController as poiCtrl'
        }).when('/login', {
            templateUrl: 'pages/login/login.html',
            controller : 'loginController as poiCtrl'
        }).when('/review', {
            templateUrl: 'pages/review/review.html',
            controller : 'reviewController as revCtrl'
        }).when('/favorites', {
            templateUrl: 'pages/favorites/favorites.html',
            controller : 'favoritesController as favCtrl'
        }).when('/register', {
            templateUrl: 'pages/register/register.html',
            controller : 'registerController as poiCtrl'
        })
        
        .otherwise({ redirectTo: '/' });
});