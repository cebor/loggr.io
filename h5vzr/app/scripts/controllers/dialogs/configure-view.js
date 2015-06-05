'use strict';

/**
 * @ngdoc function
 * @name loggrioApp.controller:ConfigureViewCtrl
 * @description
 * # ConfigureViewCtrl
 * Controller of the loggrioApp
 */
angular.module('loggrioApp')
  .controller('ConfigureViewCtrl', function ($mdDialog) {

    // TODO: bind to form
    var payload = {};

    this.cancel = function () {
      $mdDialog.cancel();
    };

    this.submit = function () {
      $mdDialog.hide(payload);
    };

  });
