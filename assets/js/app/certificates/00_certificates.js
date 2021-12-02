(function () {
  'use strict';

  angular.module('frontend.certificates', []);

  // Module configuration
  angular.module('frontend.certificates').config([
    '$stateProvider',
    function config($stateProvider) {
      $stateProvider.state('certificates', {
        parent: 'frontend',
        url: '/certificates',
        data: {
          activeNode: true,
          pageName: '证书',
          pageDescription:
            'SSL证书的公钥/私钥对，被Kong用来处理SSL/TLS的加密请求，证书可指定一个或多个主机名来关联SNI对象。',
          displayName: '证书',
          prefix: '<i class="material-icons text-primary">perm_identity</i>',
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
        views: {
          'content@': {
            templateUrl: 'js/app/certificates/certificates.html',
            controller: 'CertificatesController',
            //resolve: {
            //    _certificates : [
            //        'PluginsService',
            //        function(PluginsService) {
            //            return PluginsService.load()
            //        }
            //    ]
            //}
          },
        },
      });
    },
  ]);
})();
