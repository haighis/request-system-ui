(function(app) {

  'use strict';

  /* @ngInject */
  function appFooter() {
    return {
      restrict: 'EA',
      templateUrl: 'components/layout/footer.html',
      link: function() {
    
        // scope.appName = _.startCase(CONFIG.name);
        // scope.env = CONFIG.env.toUpperCase();
        // scope.version = 'v' + VERSION;
        // scope.lastBuild = moment(LAST_BUILD).format('ddd MMM Do, HH:mm:ss');
        // scope.lastBuildFromNow = moment(LAST_BUILD).fromNow();
      }
    };
  }

  app.directive('appFooter', appFooter);

}(angular.module('incidentSystemApp')));
