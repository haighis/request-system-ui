
(function(app) {

  'use strict';

  /* @ngInject */
  function RequestItemActionsCtrl($scope, CONFIG, CONSTANTS, logger, utils, requestService, request) {

    var vm = this;

    // Setup the view model, overriding defaults if necessary
    _.assign(vm, {
      request: request
    });
  }

  app.controller('RequestItemActionsCtrl', RequestItemActionsCtrl);

}(angular.module('incidentSystemApp')));
