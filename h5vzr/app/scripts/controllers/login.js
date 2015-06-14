'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('LoginCtrl', function ($location, Customer) {

    if (Customer.isAuthenticated()) {
      $location.path('/');
      return;
    }

    this.credentials = {};

    var self = this;

    this.login = function () {
      Customer.login(self.credentials, function() {
        var next = $location.nextAfterLogin || '/';
        $location.nextAfterLogin = null;
        $location.path(next);
      });
    };

  });
