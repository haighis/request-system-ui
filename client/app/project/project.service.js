(function (app) {

  //'use strict';

  /* ngInject */
  function projectService(CONFIG, $q, $http) {
    var svc = this;

    var apiEndpoint = 'projects';

    function getAll() {
      return $http.get('/api/' + apiEndpoint).then(function(response) {
        return response.data;
      });
    }

    function getById(id) {
      return $http.get('/api/' + apiEndpoint + id).then(function(resp) {
        return resp.data;
      });
    }

    function update(request) {
       return $http.put('/api/' + apiEndpoint + request._id, request).then(function(resp) {
        return resp.data;
      });
    }

    function add(request) {
      return $http.post('/api/' + apiEndpoint, request).then(function(resp) {
        return resp.data;
      });
    }

    function destroy(request) {
      return $http.delete('/api/' + apiEndpoint + request._id, request).then(function(resp) {
        return resp.data;
      });  
    }
    _.assign(svc, {
      getAll: getAll,
      getById: getById,
      update: update,
      add: add
    });
  }

  app.service('projectService', projectService);

}(angular.module('incidentSystemApp')));
