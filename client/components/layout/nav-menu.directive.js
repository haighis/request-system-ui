'use strict';

angular.module('incidentSystemApp')
  .directive('navigationDrawer', function() {
    return {
      templateUrl: 'components/layout/navigation-drawer.html',
      restrict: 'EA',
      replace: true,
      link: function() {
        // scope.language = i18n.getLanguage();
        // scope.currentPage = setActiveItem();
        
        // if(auth && auth.profilePromise) {
        //   auth.profilePromise.then(function() {
        //     scope.fullname = auth.profile.name;
        //     scope.profilePicture = auth.profile.picture;
        //   });
        // }
        
        // function setActiveItem() {
        //   var parts = $location.path().split('/');
        //   var page = parts.length >= 3 ? parts[2] : '';

        //   $timeout(function() {
        //     element.find('a').removeClass('active');
        //     element.find('a[href*="' + page + '"]').addClass('active');
        //   });

        //   return page;
        // }

        // scope.$on('$stateChangeSuccess', function(angularEvent, current, previous) {
        //   //setActiveItem();
        // });
      }
    };
  });
