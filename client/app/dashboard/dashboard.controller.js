
(function(app) {

  'use strict';

  /* @ngInject */
  function DashboardCtrl($scope, CONFIG, CONSTANTS, i18n, logger, utils, auth, contextService) {

    var vm = this;

    function activate() {
      if(auth && auth.profilePromise) {
        auth.profilePromise.then(function() {
          vm.profile = auth.profile;
        });
      }
    }

    activate();

        // Setup the view model, overriding defaults if necessary
    _.assign(vm, {
      profile: {},
      tenant: {}
    });
  }

  app.controller('DashboardCtrl', DashboardCtrl);

}(angular.module('incidentSystemApp')));
