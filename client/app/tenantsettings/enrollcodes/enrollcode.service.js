(function (app) {

  //'use strict';

  /* ngInject */
  function enrollCodeService(CONFIG, $q, $http, CONSTANTS,logger) {
    var svc = this;

    var apiEndpoint = 'enrollcodes';

    function getAll() {
      return $http.get('/api/' + apiEndpoint).then(function(response) {
        return response.data;
      });
    }

    function getById(id) {
      return $http.get('/api/' + apiEndpoint + '/' + id).then(
        function(resp) {
        return resp.data;
      }
      // , 
      //   function errorCallback(response) {
      //     //console.log('error')
      //     logger.debug('Error occurred', response, 'some title');
      //   }
      );
    }

    function destroy(request) {
      return $http.delete('/api/' + apiEndpoint + request._id, request).then(function(resp) {
        return resp.data;
      });  
    }

    function add(request) {
      return $http.post('/api/' + apiEndpoint, request).then(function(resp) {
        return resp.data;
      });
    }

    _.assign(svc, {
      getAll: getAll,
      getById: getById,
      addEmail: add
    });
  }

  app.service('enrollCodeService', enrollCodeService);

}(angular.module('incidentSystemApp')));
