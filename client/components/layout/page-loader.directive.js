(function(app) {

  'use strict';

  function pageLoader() {
    return {
      templateUrl: 'components/layout/page-loader.html',
      restrict: 'EA',
      link: function() {}
    };
  }

  app.directive('pageLoader', pageLoader);

}(angular.module('incidentSystemApp')));
