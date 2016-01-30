(function(app) {

  'use strict';

  /* @ngInject */
  function requiresAuth(contextService) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        function isAuthorized() {
          var requiredRoles = attrs.requiresAuth.split(',');
          var userRoles = contextService.getAppContext().UserPermissions;
          var authorized = false;

          _.each(requiredRoles, function(requiredRole) {
            authorized = _.contains(userRoles, requiredRole);
          });

          return authorized;
        }

        if (!isAuthorized()) {
          $(element)
            .attr('disabled', 'disabled')
            .addClass('disabled');

          if (attrs.noAuth) {
            if (_.contains(attrs.noAuth, 'hide') && !isAuthorized()) {
              $(element).hide();
            }
          }
        }
      }
    };
  }

  app.directive('requiresAuth', requiresAuth);

}(angular.module('incidentSystemApp')));
