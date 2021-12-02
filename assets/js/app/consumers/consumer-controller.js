/**
 * This file contains all necessary Angular controller definitions for 'frontend.admin.login-history' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function () {
  'use strict';

  angular.module('frontend.consumers').controller('ConsumerController', [
    '_',
    '$scope',
    '$log',
    '$state',
    '_consumer',
    '$rootScope',
    'Semver',
    function controller(
      _,
      $scope,
      $log,
      $state,
      _consumer,
      $rootScope,
      Semver
    ) {
      $scope.consumer = _consumer.data;
      $state.current.data.pageName =
        '消费者：' + ($scope.consumer.username || $scope.consumer.id);
      $scope.activeSection = 0;
      $scope.sections = [
        {
          id: 'details',
          name: '详情',
          icon: 'mdi-information-outline',
        },
        {
          id: 'groups',
          name: '分组',
          icon: 'mdi-account-multiple-outline',
        },
        {
          id: 'credentials',
          name: '凭证',
          icon: 'mdi-security',
        },
        // {
        //   id: 'apis',
        //   name: 'Accessible APIs',
        //   icon: 'mdi-cloud-outline'
        // },
        {
          id: 'services',
          name: '可用路由',
          icon: 'mdi-cloud-outline',
        },
      ];

      if (!_.get($rootScope, 'Gateway.plugins.available_on_server.acl')) {
        $scope.sections = _.filter($scope.sections, function (item) {
          return (
            item.id !== 'groups' &&
            item.id !== 'apis' &&
            item.id !== 'services' &&
            item.id !== 'routes'
          );
        });
      }

      if (Semver.cmp($rootScope.Gateway.version, '0.11.0') >= 0) {
        $scope.sections.push({
          id: 'plugins',
          name: '插件',
          icon: 'mdi-power-plug',
        });
      }

      $scope.showPluginsSection =
        Semver.cmp($rootScope.Gateway.version, '0.11.0') >= 0;

      $scope.onTabsSelected = function (sectionId) {
        $scope.activeSection = sectionId;
      };

      $scope.$on('user.node.updated', function (node) {
        $state.go('consumers');
      });
    },
  ]);
})();
