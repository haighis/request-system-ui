(function (app) {

//  'use strict';

  /* ngInject */
  function tenantService(CONFIG, $q, $http, userPermissionService, CONSTANTS) {
    var svc = this;

    var apiEndpoint = 'tenants';

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

    function findByEmail(request) {
      return $http.post('/api/' + apiEndpoint + '/findbyemail/', { Email: request }).then(function(resp) {
        console.log('in tenantService', resp.data); 
        return resp.data;
      });  
    }

    function signupRequestTenantManager(request) {
      return $http.post('/api/' + apiEndpoint + '/signuptenantmanager/', request).then(function(resp) {
        return resp.data;
      });  
    }

    function enrollRequestTenantUser(request) {
      return $http.post('/api/' + apiEndpoint + '/signuptenantuser/', request).then(function(resp) {
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

    function registerTenantUser(registerMessage) {
      var message = {
        TenantId: registerMessage.TenantId,
        Code: registerMessage.Code,
        Email: registerMessage.Email, 
        Name: registerMessage.Name,
        UserRole: CONSTANTS.DEFAULT_ROLES.TENANT_USER,
        UserPermission: CONSTANTS.DEFAULT_PERMISSIONS.TENANT_USER
      };

      return enrollRequestTenantUser(message).then(function(result) {
        return result;
      });  
    }

    function registerTenantManager(registerMessage) {
      var message = {
        Email: registerMessage.Email, 
        Name: registerMessage.Name,
        UserRole: CONSTANTS.DEFAULT_ROLES.TENANT_MANAGER,
        UserPermission: CONSTANTS.DEFAULT_PERMISSIONS.TENANT_MANAGER
      };

      return signupRequestTenantManager(message).then(function(result) {
        return result;
      });
    }

    _.assign(svc, {
      getAll: getAll,
      getById: getById,
      update: update,
      add: add,
      registerTenantManager: registerTenantManager,
      registerTenantUser: registerTenantUser,
      findByEmail: findByEmail
    });
  }

  app.service('tenantService', tenantService);

}(angular.module('incidentSystemApp')));
