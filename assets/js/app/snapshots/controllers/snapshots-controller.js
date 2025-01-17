/**
 * This file contains all necessary Angular controller definitions for 'frontend.admin.login-history' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function () {
  'use strict';

  angular.module('frontend.snapshots').controller('SnapshotsController', [
    '_',
    '$scope',
    function controller(_, $scope) {
      $scope.activeSection = 0;
      $scope.sections = [
        {
          name: '列表',
          icon: 'mdi mdi-format-list-bulleted',
          isVisible: true,
        },
        {
          name: '计划任务',
          icon: 'mdi mdi-calendar',
          isVisible: true,
        },
      ];

      $scope.showSection = function (index) {
        $scope.activeSection = index;
      };
    },
  ]);
})();
