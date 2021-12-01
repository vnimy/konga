(function () {
  'use strict';

  angular.module('frontend.connections', []);

  // Module configuration
  angular.module('frontend.connections').config([
    '$stateProvider',
    function config($stateProvider) {
      $stateProvider.state('connections', {
        url: '/connections',
        parent: 'frontend',
        data: {
          access: 0,
          pageName: '连接',
          pageDescription: '创建及激活Kong节点的连接。',
          prefix: '<i class="mdi mdi-cast-connected"></i>',
        },
        views: {
          'content@': {
            templateUrl: 'js/app/connections/index.html',
            controller: 'ConnectionsController',
          },
        },
      });
    },
  ]);
})();
