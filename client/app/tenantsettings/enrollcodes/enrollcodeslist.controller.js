
(function(app) {

  'use strict';
  
  /* @ngInject */
  function EnrollCodesListCtrl($scope, CONFIG, CONSTANTS, logger, utils, 
    enrollCodeService, contextService, uniqueCodeService) {

    var vm = this;

    var appContext = {};
    var tenantId = 0;

    function activate() {
      appContext = contextService.getAppContext();
      tenantId = appContext.TenantId;
    }

    activate();

    function showAddEnrollCodeModal() {
      vm.enrollCode = {}; 
      // Get unique code
      uniqueCodeService.get().then(function(result){
        vm.enrollCode.Code = result._id;
        vm.addEnrollCodeDialogShown = true;
      });
    }

    function addSendEnrollCode() {
      vm.enrollCode.TenantId = tenantId;
      vm.enrollCode.Status = 'Not Complete';

      enrollCodeService.addEmail(vm.enrollCode).then(function(result){
        logger.info('Enroll code saved and sent via email.');
        vm.addEnrollCodeDialogShown = false;
      });
    }

    // Setup the view model, overriding defaults if necessary
    _.assign(vm, {
      enrollCode: {},
      addEnrollCodeDialogShown: false,
      addSendEnrollCode: addSendEnrollCode,
      showAddEnrollCodeModal: showAddEnrollCodeModal      
    });
  }

  app.controller('EnrollCodesListCtrl', EnrollCodesListCtrl);

}(angular.module('incidentSystemApp')));
