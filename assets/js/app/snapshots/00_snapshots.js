(function () {
  'use strict';

  angular.module('frontend.snapshots', []);

  // Module configuration
  angular.module('frontend.snapshots').config([
    '$stateProvider',
    function config($stateProvider) {
      $stateProvider
        .state('snapshots', {
          url: '/snapshots',
          parent: 'frontend',
          data: {
            access: 2,
            pageName: '快照',
            displayName: '快照',
            pageDescription:
              '为当前活动节点创建快照。' +
              '<br>所有<code>服务</code>、<code>路由</code>、<code>接口</code>、' +
              '<code>插件</code>、<code>消费者</code>、<code>上游</code>和<code>后端服务器</code>将保存以便以后导入。',
            prefix: '<i class="mdi mdi-camera"></i>',
          },
          views: {
            'content@': {
              templateUrl: 'js/app/snapshots/index.html',
              controller: 'SnapshotsController',
            },
            'list@snapshots': {
              templateUrl: 'js/app/snapshots/views/snapshots-list.html',
              controller: 'SnapshotsListController',
            },
            'scheduled@snapshots': {
              templateUrl: 'js/app/snapshots/views/snapshots-scheduled.html',
              controller: 'SnapshotsScheduledController',
            },
          },
        })
        .state('snapshots.show', {
          url: '/:id',
          parent: 'snapshots',
          data: {
            access: 2,
            pageName: '快照详情',
            displayName: '快照详情',
            pageDescription: null,
            prefix: '<i class="mdi mdi-36px mdi-camera"></i>',
          },
          views: {
            'content@': {
              templateUrl: 'js/app/snapshots/views/snapshot.html',
              controller: 'SnapshotController',
            },
          },
        });
    },
  ]);
})();
