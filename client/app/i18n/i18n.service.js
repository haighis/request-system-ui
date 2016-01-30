'use strict';

/**
 * Internationalization service.
 *
 * Translates resource strings, formats currencies & dates based on language.
 */

angular.module('incidentSystemApp')
  .service('i18n', function(CONFIG, RESOURCES, logger) {

    // Look up translations for a given key in the RESOURCES object
    function findResourceByKey(key) {
      var parsedKey = _.camelCase(key);
      return _.get(RESOURCES, parsedKey, {
        en: key,
        fr: key
      });
    }

    // Return the localized translation for a given resource string key
    function localize(key, casing) {
      var resource;

      if (!key) {
        return null;
      }

      resource = i18n.findResourceByKey(key);

      if (casing) {
        return i18n.setCase(resource[_language], casing);
      }

      return resource[_language];
    }

    // Change the casing of a string
    function setCase(str, casing) {
      if (!str) {
        logger.warn('Warning, no string supplied to transform to ', casing);
        return null;
      }

      if (casing === 'upper') {
        return str.toUpperCase();
      } else if (casing === 'lower') {
        return str.toLowerCase();
      } else if (casing === 'capitalize') {
        return _.capitalize(str);
      } else if (casing === 'title' || casing === 'start') {
        if (_language === 'en') {
          // Only use this for English, since all words in French titles are not capitalized
          return _.startCase(str);
        }

        return _.capitalize(str);
      }

      return str;
    }

    // Set numeric formatting based on language
    // Updates accounting.js global settings
    function configureAccounting() {
      if (_language === 'en') {
        window.accounting.settings = {
          currency: {
            symbol: '$',
            precision: 2,
            format: '%s%v',
            decimal: '.',
            thousand: ','
          },
          number: {
            precision: 0,
            thousand: ',',
            decimal: '.'
          }
        };
      } else if (_language === 'fr') {
        window.accounting.settings = {
          currency: {
            symbol: '$',
            precision: 2,
            format: '%v%s',
            decimal: ',',
            thousand: ' '
          },
          number: {
            precision: 0,
            thousand: ' ',
            decimal: ','
          }
        };
      }
    }

    // Set the app language and update all global settings
    function setLanguage(language) {
      _language = language;
      i18n.configureAccounting();
    }

    // Get the current app language
    function getLanguage() {
      return _language;
    }

    // Configure all dynamic settings
    function configure() {
      i18n.configureAccounting();
    }

      var _language = CONFIG.language;

    // Public API
    var i18n = {
      findResourceByKey: findResourceByKey,
      localize: localize,
      setCase: setCase,
      configure: configure,
      configureAccounting: configureAccounting,
      setLanguage: setLanguage,
      getLanguage: getLanguage
    };

    return i18n;
  });
