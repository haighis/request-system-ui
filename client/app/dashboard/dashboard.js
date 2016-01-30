'use strict';

angular.module('incidentSystemApp')
  .config(function($stateProvider) {

  $stateProvider
    .state('user.dashboard', {
      url: '/dashboard',
      templateUrl: 'app/dashboard/dashboard.html',
      controller: 'DashboardCtrl',
      controllerAs: 'vm',
    // data: {
     // requiresAuth: true
    // }
  });
});
