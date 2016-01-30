
(function(app) {

  //'use strict';

  /* @ngInject */
  function IncidentItemNewCtrl($scope, CONFIG, CONSTANTS, logger, utils, incidentService) {

    var vm = this;

  //  activate();

    function activate() {
     
    }

    function save() {
      //incidentService.add(vm.incidentItem).then(function (result) {
       // logger.info('Request Successfully Saved.');
      //});
      close({});
    }
    
    // Setup the view model, overriding defaults if necessary
    _.assign(vm, {
      save: save
    });
  }

  app.controller('IncidentItemNewCtrl', IncidentItemNewCtrl);
  
}(angular.module('incidentSystemApp')));
