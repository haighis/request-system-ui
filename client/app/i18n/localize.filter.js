'use strict';

/**
 * Translate a resource string
 */

angular.module('incidentSystemApp')
  .filter('localize', function(i18n) {
    return i18n.localize;
  });
