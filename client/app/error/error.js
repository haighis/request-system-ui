'use strict';

angular.module('incidentSystemApp')
  .config(function($stateProvider) {

 $stateProvider
      .state('error', {
        url: '/error',
        templateUrl: 'app/error/error.html'
        //controller: function() {},
        //controllerAs: 'vm',
      });
});
