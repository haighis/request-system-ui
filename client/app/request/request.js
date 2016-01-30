'use strict';

angular.module('incidentSystemApp')
  .config(function($stateProvider) {

 	$stateProvider
      .state('user.requests', {
        url: '/requests',
        templateUrl: 'app/request/list/list.html',
        controller: 'RequestListCtrl',
        controllerAs: 'vm'
      });

  $stateProvider
    .state('user.requests.itemactions', {
      url: '/{requestId}',
      templateUrl: 'app/request/action/itemactions.html',
      resolve: {
      request: ['$stateParams', 'requestService',
              function($stateParams, requestService) {
			return requestService.getById($stateParams.requestId).then(function(result){
              	return result;
              });
          }]
      }, 
      controller: 'RequestItemActionsCtrl',
      controllerAs: 'vm',
    });

	$stateProvider
      .state('user.requests.itemactions.itemdetails', {
        url: '/itemdetails',
        resolve: {
        	request: ['$stateParams', 'requestService',
                function($stateParams, requestService) {
				return requestService.getById($stateParams.requestId).then(function(result){
                	return result;
                });
            }]
        },
        templateUrl: 'app/request/detail/itemdetails.html',
        controller: 'RequestItemDetailsCtrl',
        controllerAs: 'vm'
      });

	$stateProvider
      .state('user.requests.itemactions.itemedit', {
        url: '/itemedit',
        resolve: {
            request: ['$stateParams', 'requestService',
                function($stateParams, requestService) {
				return requestService.getById($stateParams.requestId).then(function(result){
                	return result;
                });
            }]
        },
        templateUrl: 'app/request/edit/itemedit.html',
        controller: 'RequestItemEditCtrl',
        controllerAs: 'vm'
      });
  });
