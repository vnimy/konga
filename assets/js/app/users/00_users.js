(function () {
  'use strict';

  angular.module('frontend.users', []);

  // Module configuration
  angular.module('frontend.users').config([
    '$stateProvider',
    function config($stateProvider) {
      $stateProvider
        .state('users', {
          url: '/users',
          parent: 'frontend',
          cache: false,
          data: {
            pageName: '用户',
            displayName: 'KONGA用户',
            pageDescription: '管理KONGA用户与角色',
          },
          views: {
            'content@': {
              templateUrl: 'js/app/users/index.html',
              controller: 'UsersController',
              resolve: {
                _items: [
                  'ListConfig',
                  'UserModel',
                  function resolve(ListConfig, UserModel) {
                    var config = ListConfig.getConfig();

                    var parameters = {
                      // populate: 'node',
                      limit: config.itemsPerPage,
                      sort: 'createdAt DESC',
                    };

                    return UserModel.load(parameters);
                  },
                ],
                _count: [
                  'UserModel',
                  function resolve(UserModel) {
                    return UserModel.count();
                  },
                ],
              },
            },
          },
        })
        .state('users.create', {
          url: '/create',
          data: {
            pageName: '创建让用户',
            displayName: '创建',
            pageDescription: null,
          },
          views: {
            'content@': {
              templateUrl: 'js/app/users/user-create.html',
              controller: 'UserCreateController',
            },
          },
        })
        .state('users.show', {
          url: '/:id',
          data: {
            pageName: '用户资料',
            displayName: '资料',
            pageDescription: null,
          },
          views: {
            'content@': {
              templateUrl: 'js/app/users/user.html',
              controller: 'UserController',
              resolve: {
                _user: [
                  '$stateParams',
                  'UserModel',
                  function resolve($stateParams, UserModel) {
                    return UserModel.fetch($stateParams.id);
                  },
                ],
              },
            },
          },
        });
    },
  ]);
})();
