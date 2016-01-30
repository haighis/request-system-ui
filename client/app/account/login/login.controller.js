
(function(app) {

  //'use strict';

  /* @ngInject */
  function LoginCtrl($scope, CONFIG, CONSTANTS, i18n, logger, 
    utils, auth, $cookies, $state, store, tenantService, userPermissionService, contextService) {

    var vm = this;

    function doGoogleAuthWithPopup () {
      auth.signin({
        popup: true,
        connection: 'google-oauth2',
        scope: 'openid name email'
      }, onLoginSuccess, onLoginFailed);
    }

    function onLoginSuccess() {
      // move this to app context as a set.
      if(auth && auth.profilePromise) {
        auth.profilePromise.then(function() {
          tenantService.findByEmail(auth.profile.email || '').then(function(result) {
            var tenantId = result[0]._id;
            userPermissionService.getByTenantId(tenantId).then(function(permResult) {
              
              //TODO if the user doesn't have any roles, then they aren't signed up as a tenant manger or tenant user so 
              // show a message indicating they must do some action

              var tenant = {
                TenantId: tenantId,
                UserRole: permResult[0].Role,
                UserPermissions: permResult[0].Permission,
              };

              contextService.storeTenant(tenant);

              $state.go('user.dashboard');
            });
          });
        });
      }
    }

    function onLoginFailed() {
    }

    // Setup the view model, overriding defaults if necessary
    _.assign(vm, {
      doGoogleAuthWithPopup: doGoogleAuthWithPopup
    });
  }

  
  app.controller('LoginCtrl', LoginCtrl);


}(angular.module('incidentSystemApp')));
