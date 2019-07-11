let app = angular.module('myApp', ["ngRoute",'ui.sortable']);


// config routes
app.config(function($routeProvider,$windowProvider)  {
    var $window = $windowProvider.$get();
    if($window.sessionStorage.getItem('vacation-token')){
        loggedIn=true;
    }
    else{
        loggedIn=false;
    }
    
    $routeProvider
        .when('/', {
            cache: false,
            templateUrl: function() {
                return loggedIn ? 'pages/homeUsers/homeUsers.html' : 'pages/homeGuests/homeGuests.html';
              },
            controller: function() {
                return loggedIn ? 'homeUsersController as userCtrl' : 'homeGuestsController as guestCtrl';
              },
        }).when('/homeGuests', {
            templateUrl: 'pages/homeGuests/homeGuests.html',
            controller : 'homeGuestsController as guestCtrl'
        }).when('/homeUsers', {
            templateUrl: 'pages/homeUsers/homeUsers.html',
            controller : 'homeUsersController as userCtrl'
        }).when('/about', {
            templateUrl: 'pages/about/about.html',
            controller : 'aboutController as abtCtrl'
        }).when('/chosenPOI', {
            templateUrl: 'pages/chosenPOI/chosenPOI.html',
            controller : 'chosenPOIController as cpoiCtrl'
        }).when('/forgotPassword', {
            templateUrl: 'pages/forgotPassword/forgotPassword.html',
            controller : 'forgotPasswordController as forgotPassCtrl'
        }).when('/poi', {
            templateUrl: 'pages/poi/poi.html',
            controller : 'poiController as poiCtrl'
        }).when('/login', {
            templateUrl: 'pages/login/login.html',
            controller : 'loginController as loginCtrl'
        }).when('/favorites', {
            templateUrl: 'pages/favorites/favorites.html',
            controller : 'favoritesController as favCtrl'
        }).when('/register', {
            templateUrl: 'pages/register/register.html',
            controller : 'registerController as regCtrl'
        })
        
        .otherwise({ redirectTo: '/' });
});

