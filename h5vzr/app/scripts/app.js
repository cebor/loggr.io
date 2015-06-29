'use strict';

/**
 * @ngdoc overview
 * @name loggrioApp
 * @description
 * # loggrioApp
 *
 * Main module of the application.
 */
angular
  .module('loggrioApp', [
    'ngRoute',
    'ngMessages',
    'lbServices',
    'ngMaterial',
    'highcharts-ng',
    'ng-sortable'
  ])
  .config(function ($routeProvider, $httpProvider, $mdThemingProvider, LoopBackResourceProvider) {

    Highcharts.setOptions({
      global: {
        timezoneOffset: new Date().getTimezoneOffset()
      },
      lang: {
        contextButtonTitle: 'Graphenoptionen',
        downloadJPEG: 'Graph als JPEG exportieren',
        downloadPDF: 'Graph als PDF exportieren',
        downloadPNG: 'Graph als PNG exportieren',
        downloadSVG: 'Graph als SVG exportieren',
        loading: 'Daten werden geladen...',
        months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
        noData: 'Keine Daten zum Anzeigen vorhanden',
        printChart: 'Graph drucken',
        shortMonths: ['Jan', 'Feb', 'Mrz', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
        weekdays: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']
      }
    });

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .otherwise({
        redirectTo: '/'
      });

    $mdThemingProvider.theme('default')
      .primaryPalette('teal');

    // TODO: seperate cfg file
    LoopBackResourceProvider.setUrlBase('http://localhost:3000/api');

    $httpProvider.interceptors.push(function($q, $location, LoopBackAuth) {
      return {
        responseError: function(rejection) {
          if (rejection.status === 401) {
            //Now clearing the loopback values from client browser for safe logout...
            LoopBackAuth.clearUser();
            LoopBackAuth.clearStorage();
            $location.nextAfterLogin = $location.path();
            $location.path('/login');
          }
          return $q.reject(rejection);
        }
      };
    });

  });
