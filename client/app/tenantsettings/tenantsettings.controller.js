
(function(app) {

  //'use strict';

  /* @ngInject */
  function TenantSettingsCtrl($scope, CONFIG, CONSTANTS, logger, utils, contextService) {

    var vm = this;

    var appContext = {};
    var tenantId = 0;

    // Setup the view model, overriding defaults if necessary
    _.assign(vm, {
    });

    function activate() {
      appContext = contextService.getAppContext();
      tenantId = appContext.TenantId;
    }

    activate();
  }

  app.controller('TenantSettingsCtrl', TenantSettingsCtrl);

}(angular.module('incidentSystemApp')));
