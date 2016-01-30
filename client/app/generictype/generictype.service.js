(function (app) {

  /* ngInject */
  function genericTypeService(CONFIG, $q, $http) {
    var svc = this;

    var apiEndpoint = 'generictypes';

    function getAll() {
      return $http.get('/api/' + apiEndpoint).then(function(response) {
        return response.data;
      });
    }

    function getByType(tag) {
      var requests;

       var deferred = $q.defer();
       $http.get('/api/' + apiEndpoint).success(function(data) { 
            //filter down by tag
            requests = _.filter(data, function(byType) {
             return byType.tag === tag;
           });

            deferred.resolve(requests);
         }).error(function(msg, code) {
            deferred.reject(msg);
    //        $log.error(msg, code);
         });
       return deferred.promise;
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
      getByType: getByType,
      getById: getById,
      update: update,
      add: add
    });

  }

  app.service('genericTypeService', genericTypeService);

}(angular.module('incidentSystemApp')));
