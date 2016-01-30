'use strict';

angular.module('incidentSystemApp')
  .config(function($stateProvider) {

 	$stateProvider
      .state('user.tenantsettings', {
        url: '/settings',
        templateUrl: 'app/tenantsettings/tenantsettings.html',
        controller: 'TenantSettingsCtrl',
        controllerAs: 'vm'
      });

  	$stateProvider
      .state('user.tenantsettings.enrollcodes', {
        url: '/enrollcodes',
    //     resolve: {
    //     	request: ['$stateParams', 'requestService',
    //             function($stateParams, requestService) {
				// return requestService.getById($stateParams.requestId).then(function(result){
    //             	return result;
    //             });
    //         }]
    //     },
        templateUrl: 'app/tenantsettings/enrollcodes/home.html',
        controller: 'EnrollCodesListCtrl',
        controllerAs: 'vm'
      });
});
