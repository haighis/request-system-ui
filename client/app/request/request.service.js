(function (app) {

  //'use strict';

  /* ngInject */
  function requestService(CONFIG, $q, $http) {
    var svc = this;
    
    function getAll(tenantId) {
      return $http.post('/api/requests/getall/', { TenantId: tenantId }).then(function(response) {
        return response.data;
      });
    }

    function getById(id) {
      return $http.get('/api/requests/' + id).then(function(resp) {
        return resp.data;
      });
    }

    function update(request) {
       return $http.put('/api/requests/' + request._id, request).then(function(resp) {
        return resp.data;
      });
    }

    function add(request) {
      return $http.post('/api/requests/', request).then(function(resp) {
        return resp.data;
      });
    }

    function destroy(request) {
      return $http.delete('/api/requests/' + request._id, request).then(function(resp) {
        return resp.data;
      });  
    }

    _.assign(svc, {
      getAll: getAll,
      getById: getById,
      update: update,
      add: add
    });

    app.service('requestService', requestService);
  }

}(angular.module('incidentSystemApp')));
