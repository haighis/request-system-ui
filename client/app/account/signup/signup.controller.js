
(function(app) {

  //'use strict';

  /* @ngInject */
  function SignupCtrl($scope, CONFIG, CONSTANTS, i18n, logger, utils, auth, tenantService, userPermissionService, $state) {

    var vm = this;

    function doGoogleAuthWithPopup () {
      auth.signin({
        popup: true,
        connection: 'google-oauth2',
        scope: 'openid name email'
      }, onLoginSuccess, onLoginFailed);
    }

    function onLoginSuccess() {
      var email;

      // Get the username
      if(auth && auth.profilePromise) {
        auth.profilePromise.then(function() {
          email = auth.profile.email;
          vm.signup.Email = email;

          tenantService.registerTenantManager(vm.signup).then(function(result) {
            if(result) {
              $state.go('accountcreated');
            }
            else {
              vm.infoMessage = 'You already have an account with this email address. Please choose an alternate account to sign up with.';
            }
          });
        });
      } 
    }

    function onLoginFailed() {
      vm.infoMessage = 'Account could not be verified.';
    }

    // TODO
    // Signup the user. If they auth properly then in sign success we will:
    // - associate permissions to user. do we need a user entity to contain their permissions?

    // login changes
    // - assign permissions. Add assign permissions to the app context.. see how worksheets does this.

    // Permissions 
    // - have permissions that will determine with ui features are enabled. 
    // HelpDesk System Manager - can add tenant. - later futures. 
    
    // HelpDesk Owner - can do everything. Can add HelpDesk User's. Can send enroll codes.

    // HelpDesk User - can only submit requests. These user's can enroll via enroll code and then submit requests. 
    // - look at worksheets to see how permissions are done.

    // Setup the view model, overriding defaults if necessary
    _.assign(vm, {
      signup: {},
      infoMessage: '',
      regsterSuccess: false,
      doGoogleAuthWithPopup: doGoogleAuthWithPopup
    });
  }

  app.controller('SignupCtrl', SignupCtrl);

}(angular.module('incidentSystemApp')));
