'use strict';

/**
 * App Run
 *
 * About Angular module run blocks:
 * Run blocks get executed after the injector is created and are used to kickstart the application.
 * Only instances and constants can be injected into run blocks.
 * This is to prevent further system configuration during application run time.
 */
angular.module('incidentSystemApp')
  .run(function($rootScope, auth, store, jwtHelper, $state, $location, logger, contextService) {

    //https://github.com/angular-ui/ui-router/wiki/Quick-Reference
    $rootScope.$on('$stateChangeStart', function(evt, toState, toParams, fromState, fromParams) {
      var stateRequiresAuthentication = false;
      
      if(toState && toState.data) {
        stateRequiresAuthentication = toState.data.access.bitMask > 1; 
      }
      
      if (!auth.isAuthenticated) {
        var token = store.get('token');

        if (token) {
          if (!jwtHelper.isTokenExpired(token)) {
            auth.authenticate(store.get('profile'), token);
          } 
          else {
            contextService.clearStore();
            $state.go('anon.login');
          }
        }
        else {
          // Redirect user to login only if the state requires authentication
          if(stateRequiresAuthentication) {
            contextService.clearStore();
            $location.path('/login');
          }
        }
      }
    });

    //https://github.com/angular-ui/ui-router/wiki/Quick-Reference
    $rootScope.$on('$stateChangeSuccess', function(evt, toState, toParams, fromState, fromParams) {
     // We can prevent this state from completing
      //evt.preventDefault();
      
    });

    //https://github.com/angular-ui/ui-router/wiki/Quick-Reference
    $rootScope.$on('$stateChangeError', function(evt, toState, toParams, fromState, fromParams) {
      // Generic error handler
      return;
    });
  });
