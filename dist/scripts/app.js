 (function() {
     function config($stateProvider, $locationProvider) {
       $locationProvider
         .html5Mode({
             enabled: true,
             requireBase: false
         })
         .state('album', {
             url: '/album',
             templateUrl: '/templates/album.html'
         });
       
     $stateProvider
         .state('landing', {
             url: '/',
             templateUrl: '/templates/landing.html'
         });
     }
 angular
         .module('blocJams', ['ui.router'])
         .config(config);
 })();