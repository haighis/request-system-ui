(function (app) {

  //'use strict';

  /* ngInject */
  function userPermissionService(CONFIG, $q, $http) {
    var vm = this;

    var apiEndpoint = 'userpermissions';

    function getByTenantId(tenantId) {
      return $http.get('/api/' + apiEndpoint + '/' + tenantId).then(function(resp) {
        return resp.data;
      });
    }

    _.assign(vm, {
      getByTenantId: getByTenantId,
    });
    // function update(request) {
    //    return $http.put('/api/' + apiEndpoint + request._id, request).then(function(resp) {
    //     return resp.data;
    //   });
    // }

    // function add(request) {
    //   return $http.post('/api/' + apiEndpoint, request).then(function(resp) {
    //     return resp.data;
    //   });
    // }
  }

app.service('userPermissionService', userPermissionService);

}(angular.module('incidentSystemApp')));
