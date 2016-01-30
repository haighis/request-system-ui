'use strict';

/**
 * App Configuration
 *
 * About Angular module configuration:
 * Configuration blocks get executed during the provider registrations and configuration phase.
 * Only providers and constants can be injected into configuration blocks.
 * This is to prevent accidental instantiation of services before they have been fully configured.
 *
 * CONFIG constant is from a dynamically created incidentSystemAppConfig module found in /client/app-config/index.js
 */


angular.module('incidentSystemApp').config(function($mdThemingProvider) {
  var customBlueMap =     $mdThemingProvider.extendPalette('light-blue', {
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50'],
    '50': 'ffffff'
  });
  $mdThemingProvider.definePalette('customBlue', customBlueMap);
  $mdThemingProvider.theme('default')
    .primaryPalette('customBlue', {
      'default': '500',
      'hue-1': '50'
    })
    .accentPalette('pink');
      $mdThemingProvider.theme('input', 'default')
        .primaryPalette('grey');
});

angular.module('incidentSystemApp').config(function($mdIconProvider) {
    $mdIconProvider
      // linking to https://github.com/google/material-design-icons/tree/master/sprites/svg-sprite
      // 
      .iconSet('action', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-action.svg', 24)
      .iconSet('alert', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-alert.svg', 24)
      .iconSet('av', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-av.svg', 24)
      .iconSet('communication', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-communication.svg', 24)
      .iconSet('content', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-content.svg', 24)
      .iconSet('device', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-device.svg', 24)
      .iconSet('editor', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-editor.svg', 24)
      .iconSet('file', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-file.svg', 24)
      .iconSet('hardware', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-hardware.svg', 24)
      .iconSet('image', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-image.svg', 24)
      .iconSet('maps', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-maps.svg', 24)
      .iconSet('navigation', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-navigation.svg', 24)
      .iconSet('notification', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-notification.svg', 24)
      .iconSet('social', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-social.svg', 24)
      .iconSet('toggle', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-toggle.svg', 24)
    
      // Illustrated user icons used in the docs https://material.angularjs.org/latest/#/demo/material.components.gridList
      .iconSet('avatars', 'https://raw.githubusercontent.com/angular/material/master/docs/app/icons/avatar-icons.svg', 24)
      .defaultIconSet('https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-action.svg', 24);
});


angular.module('incidentSystemApp')
    .config(function($stateProvider, $locationProvider, $logProvider, 
      $httpProvider, CONFIG, $urlRouterProvider, authProvider, jwtInterceptorProvider, appSecurityProvider) {

    // Top-level state is simply an abstract, URL-less state which sets a common property, data.access, to be inherited by all nested views  
    // Anonymous abstract state - anything under anon is publicly accessible that does not required authentication
    $stateProvider.state('anon', {
      abstract: true,
      template: "<ui-view/>",
      data: {
          access: appSecurityProvider.accessLevels.anon
        }
    });

    // User abstract state - anything under user is not publicly accessible that required authentication
    $stateProvider
    .state('user', {
        abstract: true,
        template: "<ui-view/>",
        data: {
            access: appSecurityProvider.accessLevels.user
        }
    });

    $urlRouterProvider.otherwise("/login");

    authProvider.init({
      domain: 'helpdesktest.auth0.com',
      clientID: '5URw0QJbFgRYtqK8sFD9AFG3HAJvOSWR',
      loginUrl: 'login'
    });

  // Add a simple interceptor that will fetch all requests and add the jwt token to its authorization header.
  // NOTE: in case you are calling APIs which expect a token signed with a different secret, you might
  // want to check the delegation-token example

    jwtInterceptorProvider.tokenGetter = function(store) {
      return store.get('token');
    };
    
    // Add a simple interceptor that will fetch all requests and add the jwt token to its authorization header.
    // NOTE: in case you are calling APIs which expect a token signed with a different secret, you might
    // want to check the delegation-token example
    $httpProvider.interceptors.push('jwtInterceptor');

    $httpProvider.interceptors.push('wsLoadingHttpInterceptor');
    $httpProvider.interceptors.push('myHttpResponseInterceptor');
    
    $locationProvider.html5Mode(true);
    $logProvider.debugEnabled(CONFIG.debug);
  });
