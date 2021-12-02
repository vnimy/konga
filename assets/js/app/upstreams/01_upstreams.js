(function () {
  'use strict';

  angular.module('frontend.upstreams', []);

  // Module configuration
  angular.module('frontend.upstreams').config([
    '$stateProvider',
    function config($stateProvider) {
      $stateProvider
        .state('upstreams', {
          parent: 'frontend',
          url: '/upstreams',
          data: {
            activeNode: true,
            pageName: '上游',
            pageDescription:
              '上游对象为虚拟主机名，可用于通过多个后端服务器对传入请求进行负载均衡。例如，对于主机为<code>service.v1.xyz</code>的服务对象，上游名为 service.v1.xyz。对此服务的请求将代理到上游定义的后端服务器。',
            displayName: '上游',
            prefix: '<i class="material-icons">&#xE8F2;</i>',
          },
          views: {
            'content@': {
              templateUrl: 'js/app/upstreams/index.html',
              controller: 'UpstreamsController',
            },
          },
        })
        .state('upstreams.edit', {
          url: '/:id',
          data: {
            pageName: '编辑上游',
            displayName: '编辑',
            pageDescription: null,
            prefix: '<i class="material-icons">&#xE8F2;</i>',
          },
          views: {
            'content@': {
              templateUrl: 'js/app/upstreams/edit.html',
              controller: 'EditUpstreamController',
            },
            'details@upstreams.edit': {
              templateUrl: 'js/app/upstreams/edit-details.html',
              controller: 'EditUpstreamDetailsController',
            },
            'targets@upstreams.edit': {
              templateUrl: 'js/app/upstreams/targets/targets.html',
              controller: 'EditUpstreamTargetsController',
            },
            'alerts@upstreams.edit': {
              templateUrl: 'js/app/upstreams/alerts/alerts.html',
              controller: 'EditUpstreamAlertsController',
            },
          },
          resolve: {
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
          },
        });
    },
  ]);
})();
