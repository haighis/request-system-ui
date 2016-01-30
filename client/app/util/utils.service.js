'use strict';

/**
 * Utility service.
 */

angular.module('incidentSystemApp')
  .service('utils', function() {

    function isDefined(val) {
      return !_.isNull(val) && !_.isUndefined(val);
    }

    function existsAndChanged(newVal, oldVal) {
      return utils.isDefined(newVal) && !angular.equals(newVal, oldVal);
    }

    // Format a number into a currency string (respects locale)
    // num: the number to format
    // opts (optional): accounting.js options object
    // See http://openexchangerates.github.io/accounting.js/#methods for more details
    function formatCurrency(num, opts) {
      var val = num || 0;
      return window.accounting.formatMoney(val, opts);
    }

    // Format a number into a string (respects locale)
    // num: the number to format
    // opts (optional): accounting.js options object
    // See http://openexchangerates.github.io/accounting.js/#methods for more details
    function formatNumber(num, opts) {
      var val = num || 0;
      return window.accounting.formatNumber(val, opts);
    }

    // Parse an input value to determine if it is a valid currency
    // Returns the numeric representation of the value (with symbols stripped) or NaN
    function parseCurrency(val) {
      var strVal;

      if (_.isUndefined(val) || _.isNull(val) || val === '') {
        strVal = '0';
      } else {
        strVal = val.replace('$', '').replace(',', '');
      }

      if (utils.regexPatterns.currency.test(strVal)) {
        return Number(strVal);
      }

      return NaN;
    }

    // Public API
    var utils = {
      isDefined: isDefined,
      existsAndChanged: existsAndChanged,
      formatCurrency: formatCurrency,
      formatNumber: formatNumber,
      parseCurrency: parseCurrency,
      // This is not a bug, at the moment there is no reason for these methods to be different
      parseNumber: parseCurrency,

      regexPatterns: {
        currency: /^(\$)?(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/,
        phone: /^(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/,
        phoneExtension: /^\d{0,5}$/,
        driversLicense: /^\w{5}[\s-]?\w{5}[\s-]?\w{5}$/,
        postalCode: /^[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ](\s*|-)[0-9][ABCEGHJKLMNPRSTVWXYZ][0-9]$/i
      }
    };

    return utils;
  });
