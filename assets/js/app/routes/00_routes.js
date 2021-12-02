(function () {
  'use strict';

  angular.module('frontend.routes', ['angular.chips', 'ngFileUpload']);

  // Module configuration
  angular.module('frontend.routes').config([
    '$stateProvider',
    function config($stateProvider) {
      $stateProvider
        .state('routes', {
          parent: 'frontend',
          url: '/routes',
          data: {
            activeNode: true,
            pageName: '路由',
            pageDescription:
              '' +
              '路由实体定义匹配客户端请求的规则。每个路由都与一个服务相关联，而一个服务可能有多个路由与它相关联。每个匹配给定路由的请求都将被代理到其关联的服务。',
            displayName: '路由',
            prefix: '<i class="material-icons">cloud_queue</i>',
          },
          views: {
            'content@': {
              templateUrl: 'js/app/routes/views/routes.html',
              controller: 'RoutesController',
              resolve: {
                _services: [
                  'ServiceModel',
                  'ListConfig',
                  function resolve(ServiceModel, ListConfig) {
                    return ServiceModel.load({
                      size: ListConfig.defaultLimit,
                    });
                  },
                ],
              },
            },
          },
        })
        .state('routes.read', {
          url: '/:route_id/read',
          data: {
            pageName: '路由',
            pageDescription: '',
            displayName: '详情',
            prefix: '<i class="mdi mdi-pencil"></i>',
          },
          views: {
            'content@': {
              templateUrl: 'js/app/routes/views/edit-route.html',
              controller: 'RouteController',
              resolve: {
                _route: [
                  'RoutesService',
                  '$stateParams',
                  function resolve(RoutesService, $stateParams) {
                    return RoutesService.findById($stateParams.route_id);
                  },
                ],
                _gateway: [
                  'InfoService',
                  '$rootScope',
                  function (InfoService, $rootScope) {
                    return new Promise((resolve, reject) => {
                      var watcher = $rootScope.$watch(
                        'Gateway',
                        function (newValue, oldValue) {
                          if (newValue) {
                            watcher(); // clear watcher
                            resolve(newValue);
                          }
                        }
                      );
                    });
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
            'details@routes.read': {
              templateUrl: 'js/app/routes/views/route-details.html',
              controller: 'RouteDetailsController',
              resolve: {
                _route: [
                  'RoutesService',
                  '$stateParams',
                  function resolve(RoutesService, $stateParams) {
                    return RoutesService.findById($stateParams.route_id);
                  },
                ],
              },
            },
            'plugins@routes.read': {
              templateUrl: 'js/app/routes/views/route-plugins.html',
              controller: 'RoutePluginsController',
            },
            'consumers@routes.read': {
              templateUrl: 'js/app/routes/views/route-consumers.html',
              controller: 'RouteConsumersController',
            },
          },
        })
        .state('routes.plugins', {
          url: '/:route_id/plugins',
          params: {
            route: {},
          },
          data: {
            pageName: '路由插件',
            displayName: '路由插件',
          },
          views: {
            'content@': {
              templateUrl: 'js/app/routes/views/route-plugins.html',
              controller: 'RoutePluginsController',
              resolve: {
                _route: [
                  'RoutesService',
                  '$stateParams',
                  function (RoutesService, $stateParams) {
                    return RoutesService.findById($stateParams.route_id);
                  },
                ],
                _plugins: [
                  'PluginsService',
                  '$stateParams',
                  function (PluginsService, $stateParams) {
                    return PluginsService.load({
                      route_id: $stateParams.route_id,
                    });
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
        })
        .state('routes.plugins.manage', {
          url: '/manage',
          data: {
            pageName: '管理路由插件',
            displayName: '管理',
          },
          views: {
            'content@': {
              templateUrl:
                'js/app/routes/views/plugins/manage/manage-route-plugins.html',
              controller: 'ManageRoutePluginsController',
              resolve: {
                _route: [
                  '$stateParams',
                  'RoutesService',
                  '$log',
                  function resolve($stateParams, RoutesService, $log) {
                    return RoutesService.findById($stateParams.route_id);
                  },
                ],
                _plugins: [
                  '$stateParams',
                  'RoutesService',
                  '$log',
                  function resolve($stateParams, RoutesService, $log) {
                    return RoutesService.plugins($stateParams.route_id);
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
