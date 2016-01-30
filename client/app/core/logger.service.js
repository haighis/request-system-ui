//'use strict';

angular
  .module('incidentSystemApp')
  .factory('logger', function(CONFIG, $http, $log) {
    
    // function sendToServer(level, message, category) {
    //   if (CONFIG.env !== 'development') {
    //     $http.post('/worksheets/api/logger', {
    //       category: category,
    //       level: level,
    //       url: window.location.href,
    //       message: message
    //     });
    //     return;
    //   }

    //   return;
    // }

    function error(message, data, title) {
      if (CONFIG.debug) {
        //toastr.error(message, title);
      }

      //sendToServer('error', message);
      $log.error('Error: ' + message, data);
    }

    function debug(message, data, title) {
      if (CONFIG.debug) {
        $log.debug('Debug: ' + message, data);
       // sendToServer('debug', message);
      }
    }

    function info(message, data, title) {
      if (CONFIG.debug) {
        //toastr.info(message, title);
      }

      //sendToServer('info', message);
      $log.info('Info: ' + message, data);
    }

    function success(message, data, title) {
      // Always show success toasts, even if they are disabled
      //toastr.success(message, title);
      //sendToServer('info', message, 'Success');
      $log.info('Success: ' + message, data);
    }

    function warning(message, data, title) {
      //toastr.warning(message, title);
     // sendToServer('info', message, 'Warnings');
      $log.warn('Warning: ' + message, data);
    }

    var service = {
      debug: debug,
      error: error,
      info: info,
      success: success,
      warning: warning,
      warn: warning,

      // straight to console; bypass toastr
      log: $log.log
    };

    return service;
  });
