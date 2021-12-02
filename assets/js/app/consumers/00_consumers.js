(function () {
  'use strict';

  angular.module('frontend.consumers', [
    'angular.chips',
    'ngMessages',
    'angularUtils.directives.dirPagination',
  ]);

  // Module configuration
  angular.module('frontend.consumers').config([
    '$stateProvider',
    function config($stateProvider) {
      $stateProvider
        .state('consumers', {
          parent: 'frontend',
          url: '/consumers',
          data: {
            activeNode: true,
            pageName: '消费者',
            pageDescription:
              '消费者对象是API的消费者或用户。您可将Kong作为主要数据存储，也可以将消费者列表映射到您的数据库，以保持Kong和现有主要数据存储之间的一致性。',
            displayName: '消费者',
            prefix: '<i class="material-icons">perm_identity</i>',
          },

          views: {
            'content@': {
              templateUrl: 'js/app/consumers/index.html',
              controller: 'ConsumersController',
            },
          },
        })
        .state('consumers.edit', {
          url: '/:id',
          data: {
            pageName: '编辑消费者',
            pageDescription: null,
            displayName: '编辑消费者',
            prefix: '<i class="material-icons">perm_identity</i>',
          },
          views: {
            'content@': {
              templateUrl: 'js/app/consumers/edit-consumer.html',
              controller: 'ConsumerController',
            },
            'details@consumers.edit': {
              templateUrl: 'js/app/consumers/details/consumer-details.html',
              controller: 'ConsumerDetailsController',
            },
            'groups@consumers.edit': {
              templateUrl: 'js/app/consumers/groups/consumer-groups.html',
              controller: 'ConsumerGroupsController',
            },
            'credentials@consumers.edit': {
              templateUrl:
                'js/app/consumers/credentials/consumer-credentials.html',
              controller: 'ConsumerCredentialsController',
            },
            'apis@consumers.edit': {
              templateUrl: 'js/app/consumers/apis/consumer-apis.html',
              controller: 'ConsumerApisController',
            },
            'plugins@consumers.edit': {
              templateUrl: 'js/app/consumers/plugins/consumer-plugins.html',
              controller: 'ConsumerPluginsController',
            },
            'services@consumers.edit': {
              templateUrl: 'js/app/consumers/services/consumer-services.html',
              controller: 'ConsumerServicesController',
            },
            'routes@consumers.edit': {
              templateUrl: 'js/app/consumers/routes/consumer-routes.html',
              controller: 'ConsumerRoutesController',
            },
          },
          resolve: {
            _consumer: [
              'ConsumerService',
              '$stateParams',
              function (ConsumerService, $stateParams) {
                return ConsumerService.findById($stateParams.id);
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
        });
    },
  ]);
})();
