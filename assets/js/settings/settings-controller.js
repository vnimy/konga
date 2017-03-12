/**
 * This file contains all necessary Angular controller definitions for 'frontend.admin.login-history' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
    'use strict';

    angular.module('frontend.settings')
        .controller('SettingsController', [
            '_','$scope', '$rootScope','$q','$log','$ngBootbox','UserModel',
            'SocketHelperService','UserService','SettingsService','MessageService',
            '$state','$uibModal','DialogService','NodeModel','$localStorage',
            'ListConfig','_nodes','_countNodes',
            function controller(_,$scope, $rootScope,$q,$log,$ngBootbox,UserModel,
                                SocketHelperService, UserService,SettingsService, MessageService,
                                $state, $uibModal,DialogService,NodeModel,$localStorage,
                                ListConfig, _nodes, _countNodes ) {


                NodeModel.setScope($scope, false, 'items', 'itemCount');

                // Add default list configuration variable to current scope
                $scope = angular.extend($scope, angular.copy(ListConfig.getConfig()));

                // Set initial data
                $scope.nodes = _nodes;
                $scope.nodesCount = _countNodes.count;
                $scope.user = UserService.user();
                $scope.kong_versions = [{'name' : "0.9.x",'value' :"0-9-x"},{'name' : "0.10.x",value :"0-10-x"}]
                $scope.general_settings = SettingsService.getSettings()
                console.log("$scope.general_settings",$scope.general_settings)


                $scope.updateSettings = function() {
                    SettingsService.setSettings($scope.general_settings)
                    MessageService.success('Settings updated successfully!')
                }

                // Initialize used title items
                $scope.nodeTitleItems = ListConfig.getTitleItems(NodeModel.endpoint);

                $log.debug("_nodes",_nodes)
                $log.debug("nodesCount",$scope.nodesCount)
                $log.debug("nodeTitleItems",$scope.nodeTitleItems)

                // Initialize default sort data

                $scope.paging = {
                    currentPage: 1,
                };

                $scope.sort = {
                    column: 'createdAt',
                    direction: false,
                };

                // Initialize filters
                $scope.filters = {
                    searchWord: '',
                    columns: $scope.nodeTitleItems,
                };

                // Function to change sort column / direction on list
                $scope.changeSort = function changeSort(item) {
                    var sort = $scope.sort;

                    if (sort.column === item.column) {
                        sort.direction = !sort.direction;
                    } else {
                        sort.column = item.column;
                        sort.direction = true;
                    }

                    _triggerFetchData();
                };


                $scope.pageChanged = function() {
                    $log.log('Page changed to: ' + $scope.paging.currentPage);
                    _fetchData();
                }

                /**
                 * Simple watcher for 'itemsPerPage' scope variable. If this is changed we need to fetch author data
                 * from server.
                 */
                $scope.$watch('itemsPerPage', function watcher(valueNew, valueOld) {
                    if (valueNew !== valueOld) {
                        _triggerFetchData();
                    }
                });


                $scope.$watch('filters', function watcher(valueNew, valueOld) {
                    if (valueNew !== valueOld) {
                        _triggerFetchData();
                    }
                },true);


                // User delete dialog buttons configuration
                $scope.confirmButtonsDelete = {
                    ok: {
                        label: 'Delete',
                        className: 'btn-danger btn-link',
                        callback: function callback(result,node) {
                            console.log(node)
                            //$scope.deleteNode();
                        }
                    },
                    cancel: {
                        label: 'Cancel',
                        className: 'btn-default btn-link'
                    }
                };


                $scope.deleteNode = function deleteNode(node) {

                    NodeModel
                        .delete(node.id)
                        .then(
                            function onSuccess() {
                                MessageService.success('Node deleted successfully');
                                $rootScope.$broadcast('kong.node.deleted',node)
                                _triggerFetchData()

                            }
                        )
                    ;
                };

                $scope.toggleActive = function(node) {
                    NodeModel
                        .update(node.id,{active:!node.active})
                        .then(
                            function onSuccess(result) {
                                $rootScope.$broadcast('kong.node.updated',result.data)
                                if(node.active) {
                                    $rootScope.$broadcast('kong.node.deactivated',result.data)
                                }else{
                                    $rootScope.$broadcast('kong.node.activated',result.data)
                                }
                            },function(err){
                                $scope.busy = false
                                NodeModel.handleError($scope,err)
                            }
                        )
                    ;
                }


                function showTestNodeModal(node) {
                    $uibModal.open({
                        animation: true,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: '/js/settings/modals/test-node-modal.html',
                        size : 'sm',
                        backdrop: 'static',
                        keyboard: false,
                        controller: function($scope,$log,InfoService,MessageService,$uibModalInstance,_node) {

                            $scope.close = function(){
                                $uibModalInstance.dismiss()
                            }

                            $scope.connecting = true;

                            $scope.url = _node.kong_admin_url;

                            InfoService.getInfo()
                                .then(function(res){
                                    console.log(res)
                                    $scope.connecting = false;
                                    $scope.connectionSucceeded = true;
                                })
                                .catch(function(err){
                                    $scope.connecting = false;
                                })


                        },
                        resolve : {
                            _node : function() {
                                return node;
                            }
                        }
                    });
                }

                $scope.updateNode = function(node) {
                    NodeModel
                        .update(node.id,node)
                        .then(
                            function onSuccess(result) {
                                $rootScope.$broadcast('kong.node.updated',result.data)
                                if(!node.active) showTestNodeModal(node)
                            },function(err){
                                $scope.busy = false
                                NodeModel.handleError($scope,err)
                            }
                        )
                    ;
                }

                $scope.createNode = function() {
                    $uibModal.open({
                        animation: true,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: '/js/settings/modals/create-node-modal.html',
                        size : 'lg',
                        controller: function($scope,$rootScope,$log,NodeModel,MessageService,$uibModalInstance) {
                            $scope.node = {
                                kong_admin_url : '',
                            }

                            $scope.close = function(){
                                $uibModalInstance.dismiss()
                            }

                            $scope.create = function() {
                                $scope.busy = true;
                                NodeModel
                                    .create(angular.copy($scope.node))
                                    .then(
                                        function onSuccess(result) {
                                            $log.info('New node created successfully',result)
                                            MessageService.success('New node created successfully');
                                            $scope.busy = false;
                                            $rootScope.$broadcast('kong.node.created',result.data)
                                            $uibModalInstance.dismiss()
                                        },function(err){
                                            $scope.busy = false
                                            NodeModel.handleError($scope,err)
                                        }
                                    )
                                ;
                            }
                        }
                    });
                }


                function _triggerFetchData() {
                    if ($scope.paging.currentPage === 1) {
                        _fetchData();
                    } else {
                        $scope.paging.currentPage = 1;
                    }
                }


                /**
                 * Helper function to fetch actual data for GUI from backend server with current parameters:
                 *  1) Current page
                 *  2) Search word
                 *  3) Sort order
                 *  4) Items per page
                 *
                 * Actually this function is doing two request to backend:
                 *  1) Data count by given filter parameters
                 *  2) Actual data fetch for current page with filter parameters
                 *
                 * These are fetched via 'AuthorModel' service with promises.
                 *
                 * @private
                 */
                function _fetchData() {
                    $scope.loading = true;

                    // Common parameters for count and data query
                    var commonParameters = {
                        where: SocketHelperService.getWhere($scope.filters)
                    };

                    // Data query specified parameters
                    var parameters = {
                        limit: $scope.itemsPerPage,
                        skip: ($scope.paging.currentPage - 1) * $scope.itemsPerPage,
                        sort: $scope.sort.column + ' ' + ($scope.sort.direction ? 'ASC' : 'DESC')
                    };

                    // Fetch data count
                    var count = NodeModel
                        .count(commonParameters)
                        .then(
                            function onSuccess(response) {
                                $scope.itemCount = response.count;
                            }
                        );


                    // Fetch actual data
                    var load = NodeModel
                        .load(_.merge({}, commonParameters, parameters))
                        .then(
                            function onSuccess(response) {
                                $scope.nodes = response;
                            }
                        )
                        ;

                    // And wrap those all to promise loading
                    $q
                        .all([count, load])
                        .finally(
                            function onFinally() {
                                $scope.loaded = true;
                                $scope.loading = false;
                            }
                        )
                    ;
                }
                $scope.$on('kong.node.updated',function(ev,node){
                    _triggerFetchData()
                    if(node.active) updateUserNode(node)
                })

                $scope.$on('kong.node.deactivated',function(ev,node){
                    updateUserNode()
                })

                $scope.$on('kong.node.activated',function(ev,node){
                    updateUserNode(node)
                })
                $scope.$on('kong.node.created',function(ev,node){
                    _triggerFetchData()
                })

                $scope.$on('kong.node.deleted',function(ev,node){
                    _triggerFetchData()
                    if(node.active) updateUserNode()
                })

                function updateUserNode(node) {
                    UserModel
                        .update(UserService.user().id, {
                            node_id : node ? node.kong_admin_url : ''
                        })
                        .then(
                            function onSuccess(res) {
                                var credentials = $localStorage.credentials
                                credentials.user.node_id = res.data.node_id
                                $localStorage.credentials = credentials
                            }
                        );
                }


            }
        ])
    ;
}());