(function(app) {

  //'use strict';

  /* ngInject */
  function contextService($q, CONFIG, CONSTANTS, $http, logger, tenantService, auth, store) {
    var svc = this;
    var _appContext = {};

    function getAppContext() {
      return store.get('Tenant');
      // var deferred = $q.defer();

      // if(auth && auth.profilePromise) {
      //   auth.profilePromise.then(function() {
      //     tenantService.findByEmail(auth.profile.email || '').then(function(result) {
      //       deferred.resolve(result);
      //     });
      //   });
      // }

      // return deferred.promise;
    }

    // TODO move all aspects that are littered in controllers related to login, logout
    // login todo

    function storeTenant(tenant) {
      store.set('Tenant', tenant); // todo move to context service
    }

    // logout
    function clearStore() {
      auth.signout();
      store.remove('token');
      store.remove('Tenant');
    }

    _.assign(svc, {
      getAppContext: getAppContext,
      clearStore: clearStore,
      storeTenant: storeTenant
    });
  }

  app.service('contextService', contextService);

}(angular.module('incidentSystemApp')));
