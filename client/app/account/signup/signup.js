'use strict';

angular.module('incidentSystemApp')
  .config(function($stateProvider) {

 $stateProvider
      .state('anon.signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl',
        controllerAs: 'vm'
      });
});