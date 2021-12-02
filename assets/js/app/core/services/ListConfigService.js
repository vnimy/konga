/**
 * Simple service to return configuration for generic list. This service contains only
 * getter methods that all list views uses in Boilerplate frontend application.
 *
 * So generally you change these getter methods and changes are affected to all list
 * views on application.
 *
 * @todo text translations
 */
(function () {
  'use strict';

  angular.module('frontend.core.services').factory('ListConfig', [
    '_',
    'DialogService',
    '$log',
    'AuthService',
    'MessageService',
    function factory(_, DialogService, $log, AuthService, MessageService) {
      /**
       * List title item configuration.
       */
      let titleItems = {
        service: [
          {
            title: '名称',
            column: 'name',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '主机',
            column: 'host',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '标签',
            column: 'extras.tags',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '创建时间',
            column: 'created_at',
            sortable: true,
          },
        ],
        route: [
          {
            title: '名称 / ID',
            column: 'id',
            width: 100,
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '标签',
            column: 'tags',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '主机',
            column: 'hosts',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '服务',
            column: 'service',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '路径',
            column: 'paths',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '创建时间',
            column: 'created_at',
            sortable: true,
          },
        ],
        api: [
          {
            title: '名称',
            column: 'name',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '上游地址',
            column: 'upstream_url',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '创建时间',
            column: 'created_at',
            sortable: true,
          },
        ],
        consumerApi: [
          {
            title: '名称',
            width: 200,
            column: 'name',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
        ],
        consumerACLs: [
          {
            title: '权限组',
            column: 'group',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
        ],
        consumerService: [
          {
            title: '名称',
            width: 200,
            column: 'name',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '主机',
            column: 'host',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
        ],
        consumerRoute: [
          {
            title: '名称',
            column: 'name',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '主机',
            column: 'hosts',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '服务',
            column: 'service',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '路径',
            column: 'paths',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
        ],
        target: [
          {
            title: '',
            column: '',
            width: 1,
          },
          {
            title: '后端服务器',
            column: 'target',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '权重',
            column: 'weight',
          },
          {
            title: '创建时间',
            column: 'created_at',
            sortable: true,
          },
        ],
        upstream: [
          {
            title: '',
            column: '',
            width: 1,
          },
          {
            title: '名称',
            column: 'name',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '标签',
            column: 'tags',
            searchable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '插槽',
            column: 'slots',
          },
          {
            title: '创建时间',
            column: 'created_at',
            sortable: true,
          },
        ],
        upstreamAlert: [
          {
            title: '',
            column: '',
            width: 1,
          },
          {
            title: '上游',
            column: 'upstream_id',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '连接',
            column: 'connection',
          },
          {
            title: '创建时间',
            column: 'created_at',
            sortable: true,
          },
        ],
        kongnode: [
          {
            title: '',
            column: '',
            width: 1,
          },
          {
            title: '',
            column: '',
            width: 1,
          },
          {
            title: '名称',
            column: 'name',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '类型',
            column: 'type',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: 'Kong管理地址',
            column: 'kong_admin_url',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: 'Kong版本',
            column: 'kong_version',
          },
          {
            title: '创建时间',
            column: 'createdAt',
            sortable: true,
          },
        ],
        consumerWithCreds: [
          {
            title: '',
            width: 1,
          },
          {
            title: '用户名',
            column: 'username',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '自定义ID',
            column: 'custom_id',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '匹配证书',
            column: 'plugins',
            searchable: true,
            sortable: true,
          },
          {
            title: '创建时间',
            column: 'created_at',
            sortable: true,
          },
          {
            title: '',
            hide: !AuthService.hasPermission('consumers', 'delete'),
            column: false,
            width: 1,
          },
        ],
        consumer: [
          {
            title: '',
            width: 1,
          },
          {
            title: '用户名',
            column: 'username',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '自定义ID',
            column: 'custom_id',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '标签',
            column: 'tags',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '创建时间',
            column: 'created_at',
            sortable: true,
          },
          {
            title: '',
            hide: !AuthService.hasPermission('consumers', 'delete'),
            column: false,
            width: 1,
          },
        ],
        user: [
          //{
          //  title: '#',
          //  width : 1
          //},
          {
            title: '',
            column: '',
            width: 1,
          },
          {
            title: '用户名',
            column: 'username',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '姓氏',
            column: 'firstName',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '名称',
            column: 'lastName',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '创建时间',
            column: 'createdAt',
            sortable: true,
          },
          {
            title: '更新时间',
            column: 'updatedAt',
            sortable: true,
          },
          {
            title: '',
            hide: !AuthService.hasPermission('users', 'delete'),
            column: '',
            width: 1,
          },
        ],
        snapshot: [
          //{
          //  title: 'id',
          //  column: 'id',
          //  searchable: true,
          //  sortable: true,
          //  inSearch: true,
          //  inTitle: true
          //},
          {
            title: '名称',
            column: 'name',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '节点',
            column: 'kong_node_name',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '创建时间',
            column: 'createdAt',
            sortable: true,
            inTitle: true,
          },
        ],
        snapshotschedule: [
          {
            title: '连接',
            column: 'connection',
            inTitle: true,
          },
          {
            title: '定时',
            column: 'cron',
            inTitle: true,
          },
          {
            title: '创建时间',
            column: 'createdAt',
            sortable: true,
            inTitle: true,
          },
        ],
        plugin: [
          {
            title: '名称',
            column: 'name',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '范围',
            column: 'scope',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '应用于',
            column: 'item_id',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '消费者',
            column: 'consumer_id',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '创建时间',
            column: 'created_at',
            class: 'col-xs-2',
            searchable: false,
            sortable: false,
            inSearch: false,
            inTitle: true,
          },
        ],
        certificate: [
          {
            title: 'ID',
            column: 'id',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '标签 ',
            column: 'tags',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '服务器名称指示(SNI)',
            column: 'snis',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '创建时间',
            column: 'created_at',
            class: 'col-xs-2',
            searchable: false,
            sortable: false,
            inSearch: false,
            inTitle: true,
          },
        ],
        userlogin: [
          {
            title: 'IP地址',
            column: 'ip',
            class: 'col-xs-2',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '浏览器',
            column: 'browser',
            class: 'col-xs-2',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '操作系统',
            column: 'os',
            class: 'col-xs-2',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '用户名',
            column: false,
            class: 'col-xs-2',
            searchable: false,
            sortable: false,
            inSearch: false,
            inTitle: true,
          },
          {
            title: '登录时间',
            column: 'createdAt',
            class: 'col-xs-4',
            searchable: false,
            sortable: true,
            inSearch: false,
            inTitle: true,
          },
        ],
        'cluster.nodes': [
          {
            title: '状态',
            column: 'status',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '名称',
            column: 'name',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '地址',
            column: 'address',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
        ],
        hc: [
          {
            title: '',
            column: 'active',
            sortable: true,
          },
          {
            title: '接口',
            column: 'api.name',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '健康检查端',
            column: 'health_check_endpoint',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '通知端',
            column: 'notification_endpoint',
            searchable: true,
            sortable: true,
            inSearch: true,
            inTitle: true,
          },
          {
            title: '创建时间',
            column: 'created_at',
            class: 'col-xs-2',
            sortable: false,
          },
        ],
      };

      let defaultLimit = 1000;

      return {
        defaultLimit: defaultLimit,
        getConfig: function getConfig(property, model) {
          return {
            itemCount: 0,
            items: [],
            itemsFetchSize: defaultLimit,
            itemsPerPage: 25,
            titleItems: this.getTitleItems(property),
            itemsPerPageOptions: [10, 25, 50, 100],
            currentPage: 1,
            sort: {
              column: 'created_at',
              direction: true,
            },
            filters: {
              searchWord: '',
              columns: this.getTitleItems(property),
            },
            where: {},
            loading: true,
            loaded: false,
            handleErrors: function (err) {
              model.scope.errors = {};
              if (err.data && err.data.body) {
                Object.keys(err.data.body).forEach(function (key) {
                  model.scope.errors[key] = err.data.body[key];
                });
              }
            },
            changeSort: function changeSort(item) {
              var sort = model.scope.sort;

              if (sort.column === item.column) {
                sort.direction = !sort.direction;
              } else {
                sort.column = item.column;
                sort.direction = true;
              }
            },
            deleteItem: function deleteItem($index, item) {
              DialogService.confirm(
                '确认',
                '是否删除所选项？',
                ['否', '是'],
                function accept() {
                  model.delete(item.id || item.name).then(
                    function (res) {
                      var context = model.scope.items.data || model.scope.items;
                      context.splice(context.indexOf(item), 1);
                    },
                    function (err) {
                      $log.error(
                        'ListConfigService : Model delete failed => ',
                        err
                      );
                      MessageService.error(
                        '出现一些错误！ ' + _.get(err, 'data.body.message', '')
                      );
                    }
                  );
                },
                function decline() {}
              );
            },
          };
        },

        /**
         * Getter method for lists title items. These are defined in the 'titleItems'
         * variable.
         *
         * @param   {String}    model   Name of the model
         *
         * @returns {Array}
         */
        getTitleItems: function getTitleItems(model) {
          return _.isUndefined(titleItems[model]) ? [] : titleItems[model];
        },
      };
    },
  ]);
})();
