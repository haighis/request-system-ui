(function (app) {

  //'use strict';

  /* ngInject */
  function uniqueCodeService(CONFIG, $q, $http, CONSTANTS) {
    var svc = this;

    var apiEndpoint = 'uniquecodes';

    function get() {
      return $http.get('/api/' + apiEndpoint).then(function(response) {
        return response.data;
      });
    }

    _.assign(svc, {
      get: get
    });
  }

  app.service('uniqueCodeService', uniqueCodeService);

}(angular.module('incidentSystemApp')));
