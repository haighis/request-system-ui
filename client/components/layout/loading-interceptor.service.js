'use strict';

angular.module('incidentSystemApp').factory('myHttpResponseInterceptor', function ($q, $injector) {
    return {
        'responseError': function(rejection) {
            // Log the error and redirect user to Error Page
            var logging = $injector.get('logger');
            logging.debug('An error occurred', rejection, 'Error');
            
            // Why are we using injector here and not using state above?
            // The Cause
            // angular-ui-router injects the $http service as a dependency into $TemplateFactory which then creates a 
            // circular reference to $http within the $httpProvider itself upon dispatching the interceptor.
            $injector.get('$state').transitionTo('error');
            // TODO do something on error code 
            // if(rejection.status === 500){
            // }
            return $q.reject(rejection);
         }
     };
});
angular.module('incidentSystemApp').factory('wsLoadingHttpInterceptor', function($q, $timeout, $rootScope) {

  var queue = [];
  var timerPromiseHide = null;
  var delayIn = 0;
  var delayOut = 500; // Avoid flicker

  $rootScope.isDataLoading = false;

  function processRequest() {
    queue.push({});
    if (queue.length === 1) {
      $timeout(function() {
        if (queue.length) {
          $rootScope.isDataLoading = true;
        }
      }, delayIn);
    }
  }

  function processResponse() {
    queue.pop();
    if (!queue.length) {
      // Since we don't know if another XHR request will be made, pause before
      // hiding the overlay. If another XHR request comes in then the overlay
      // will stay visible which prevents a flicker
      timerPromiseHide = $timeout(function() {
        // Make sure queue is still 0 since a new XHR request may have come in
        // while timer was running
        if (!queue.length) {
          $rootScope.isDataLoading = false;
          if (timerPromiseHide) {
            $timeout.cancel(timerPromiseHide);
          }
        }
      }, delayOut);
    }
  }

  return {
    request: function(config) {
      processRequest();
      return config || $q.when(config);
    },

    response: function(response) {
      processResponse();
      return response || $q.when(response);
    },

    responseError: function(rejection) {
      processResponse();
      return $q.reject(rejection);
    }
  };
});
