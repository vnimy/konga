(function () {
  'use strict';

  angular.module('frontend.plugins', []);

  // Module configuration
  angular.module('frontend.plugins').config([
    '$stateProvider',
    function config($stateProvider) {
      $stateProvider
        .state('plugins', {
          parent: 'frontend',
          url: '/plugins',
          data: {
            activeNode: true,
            pageName: '插件',
            pageDescription:
              '插件实体表示将在HTTP请求/响应生命周期期间执行的插件配置。它是如何为在Kong后面运行的服务添加功能的，例如 Authentication 或 Rate Limiting 。您可以访问Kong Hub，获取有关如何安装以及每个插件所需值的更多信息。',
            displayName: '插件',
            prefix:
              '<i class="material-icons text-primary">settings_input_component</i>',
          },
          views: {
            'content@': {
              templateUrl: 'js/app/plugins/plugins.html',
              controller: 'PluginsController',
            },
          },
        })
        .state('plugins.add', {
          url: '/add',
          params: {
            api: {},
          },
          data: {
            pageName: '添加全局插件',
            pageDescription: null,
            displayName: '添加',
          },
          views: {
            'content@': {
              templateUrl: 'js/app/plugins/add-plugins.html',
              controller: 'AddPluginsController',
              resolve: {
                _plugins: [
                  '$stateParams',
                  'PluginsService',
                  '$log',
                  function resolve($stateParams, PluginsService, $log) {
                    return PluginsService.load();
                  },
                ],
                _info: [
                  '$stateParams',
                  'InfoService',
                  '$log',
                  function resolve($stateParams, InfoService, $log) {
                    return InfoService.getInfo();
                  },
                ],
                _activeNode: [
                  'NodesService',
                  function resolve(NodesService) {
                    return NodesService.isActiveNodeSet();
                  },
                ],
              },
            },
          },
        });
    },
  ]);
})();
