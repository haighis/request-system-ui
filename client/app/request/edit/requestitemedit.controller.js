
(function(app) {

  /* @ngInject */
  function RequestItemEditCtrl($scope, CONFIG, CONSTANTS, logger, utils, requestService, projectService, request, genericTypeService) {

    var vm = this;

    function activate() {

      genericTypeService.getByType(CONSTANTS.GENERIC_TYPE_TAG.REQUEST_TYPE).then(function(response) {
         vm.requestOptions.requestTypeOptions = response;
      }); 

      genericTypeService.getByType(CONSTANTS.GENERIC_TYPE_TAG.DEPARTMENT).then(function(response) {
         vm.requestOptions.departmentOptions = response;
      }); 

      genericTypeService.getByType(CONSTANTS.GENERIC_TYPE_TAG.URGENCY).then(function(response) {
         vm.requestOptions.urgencyOptions = response;
      }); 

      genericTypeService.getByType(CONSTANTS.GENERIC_TYPE_TAG.CATEGORY).then(function(response) {
         vm.requestOptions.categoryOptions = response;
      }); 

      genericTypeService.getByType(CONSTANTS.GENERIC_TYPE_TAG.PRIORITY).then(function(response) {
         vm.requestOptions.priorityOptions = response;
      }); 

      genericTypeService.getByType(CONSTANTS.GENERIC_TYPE_TAG.MODE).then(function(response) {
         vm.requestOptions.modeOptions = response;
      }); 

      genericTypeService.getByType(CONSTANTS.GENERIC_TYPE_TAG.IMPACT).then(function(response) {
         vm.requestOptions.impactOptions = response;
      }); 

      projectService.getAll().then(function(response) {
        vm.requestOptions.projectOptions = response;
      });
    }

    function save() {
      requestService.update(vm.request).then(function (result) {
        logger.info('Request Successfully Saved.');
      });
    }

    // Setup the view model, overriding defaults if necessary
    _.assign(vm, {
      result: {},
      save: save,
      request: request
    });

    activate();

    vm.requestOptions = _.assign({
      requestTypeOptions: {},
      statusOptions: angular.copy(CONSTANTS.REQUEST_STATUS),
      departmentOptions: {},
      urgencyOptions: {},
      categoryOptions: {},
      priorityOptions: {},
      modeOptions: {},
      impactOptions: {},
      projectOptions: {},
    });
  }

  app.controller('RequestItemEditCtrl', RequestItemEditCtrl);

}(angular.module('incidentSystemApp')));
