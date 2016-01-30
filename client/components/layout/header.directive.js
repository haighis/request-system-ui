(function(app) {

  'use strict';

  function appHeader() {
    return {
      templateUrl: 'components/layout/header.html',
      restrict: 'EA',
      controller: HeaderCtrl,
      scope: {
        title: '@',
        enableFab: '=',
        enableSearch: '=',
        enableActions: '='
      },
      link: function() {

      }
    };
  }

  /* @ngInject */
  function HeaderCtrl($mdBottomSheet, $mdSidenav) {
    var vm = this;
    
    //console.log('enableSearch', enableSearch)

    vm.showSearch = false;
    vm.alert = '';

    vm.toggleSearch = function() {
      vm.showSearch = !vm.showSearch;
    };
    
    vm.toggleSidenav = function(menuId) {
      $mdSidenav(menuId).toggle();
    };

    vm.showListBottomSheet = function($event) {
      $mdBottomSheet.show({
        template: '<md-bottom-sheet class="md-list md-has-header"><md-list><md-list-item class="md-2-line" ng-repeat="item in items" role="link" md-ink-ripple><md-icon md-svg-icon="{{item.icon}}" aria-label="{{item.name}}"></md-icon><div class="md-list-item-text"><h3>{{item.name}}</h3></div></md-list-item> </md-list></md-bottom-sheet>',
        controller: 'ListBottomSheetCtrl',
        targetEvent: $event
      }).then(function(clickedItem) {
        vm.alert = clickedItem.name + ' clicked!';
      });
    };

  }

  app.directive('appHeader', appHeader);

}(angular.module('incidentSystemApp')));
