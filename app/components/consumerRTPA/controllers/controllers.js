/**
 * Created by Earl on 6/16/2015.
 */


var myControllers = angular.module('myControllers', []);



myControllers.controller('OrderListCtrl', ['$scope', '$http', '$interval', '$modal', '$log',
    function ($scope, $http, $interval, $modal, $log) {

        $scope.myAppScopeProvider = {

            showInfo : function(row) {
                var modalInstance = $modal.open({
                    controller: 'InfoController',
                    templateUrl: 'ngTemplate/infoPopup.html',
                    resolve: {
                        selectedRow: function () {
                            return row.entity;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    $log.log('modal selected Row: ' + selectedItem);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            }
        }

       $scope.gridOptions = {
            showFooter: false,
            enableSorting: true,
            multiSelect: false,
            enableFiltering: true,
            enableRowSelection: true,
            enableSelectAll: false,
            enableRowHeaderSelection: false,
            enableGridMenu: true,
            noUnselect: true,
            onRegisterApi: function (gridApi){
                $scope.gridApi = gridApi;
            },
           appScopeProvider: $scope.myAppScopeProvider,
           rowTemplate: "<div ng-dblclick=\"grid.appScope.showInfo(row)\" ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" ui-grid-cell></div>"
       }

        $scope.gridOptions.columnDefs = [
            { name: 'SplitPay', enableCellEditOnFocus:false, displayName:'Split Pay' },
            { name: 'DPID', enableCellEditOnFocus:false, displayName:'DPID' },
            { name: 'OrderNumber', enableCellEditOnFocus:false, displayName:'Order Number' },
            { name: 'DCN', enableCellEditOnFocus:false, displayName:'DCN' },
            { name: 'CoNum', enableCellEditOnFocus:false, displayName:'Co Num' },
            { name: 'Source', enableCellEditOnFocus:false, displayName:'Source'},
            { name: 'OrderDate', enableCellEditOnFocus:false, displayName:'Order Date'},
            { name: 'DellStatus', enableCellEditOnFocus:false, displayName:'Dell Status'},
            { name: 'DFSStatus', enableCellEditOnFocus:false, displayName:'DFS Status' },
            { name: 'AuthCode', enableCellEditOnFocus:false, displayName:'Auth Code' },
            { name: 'DPAAmt', enableCellEditOnFocus:false, displayName:'DPAAmt' },
            { name: 'TotalAmt', enableCellEditOnFocus:false, displayName:'TotalAmt' }
       ];

        var millisecondsToWait = 5000;
        setTimeout(function() {
            $scope.gridOptions.data = [
                {
                    "SplitPay": "Sue",
                    "DPID": "456353522",
                    "OrderNumber": "6785674564",
                    "DCN": "456867567",
                    "CoNum": "1678678",
                    "Source": "Phone",
                    "OrderDate": "7/1/2015",
                    "DellStatus": "Good",
                    "DFSStatus": "Good",
                    "AuthCode": "AC",
                    "DPAAmt": "1000",
                    "TotalAmt": "150"
                },
                {
                    "SplitPay": "Bob",
                    "DPID": "667456745",
                    "OrderNumber": "234213423",
                    "DCN": "56756575",
                    "CoNum": "7978567457",
                    "Source": "Phone",
                    "OrderDate": "7/2/2015",
                    "DellStatus": "Good",
                    "DFSStatus": "Bad",
                    "AuthCode": "ACC",
                    "DPAAmt": "5000",
                    "TotalAmt": "820"
                }
            ];
        }, millisecondsToWait);


        $scope.currentFocused = "";

        $scope.getCurrentFocus = function(){
            var rowCol = $scope.gridApi.cellNav.getFocusedCell();
            if(rowCol !== null) {
                $scope.currentFocused = 'Row Id:' + rowCol.row.entity.id + ' col:' + rowCol.col.colDef.name;

            }
        }

        $scope.gridOptions.onRegisterApi = function(gridApi){
            $scope.gridApi = gridApi;
        };

/*        $http.get("../app/js/ordersdata.json").success(function(data) {
            $scope.orders = data;
        });*/

        $scope.showModal = false;

        $scope.toggleMyModal = function(){
            $scope.showModal = !$scope.showModal;
        };

    }]);

myControllers.controller('InfoController',
    ['$scope', '$modal', '$modalInstance', '$filter', '$interval', 'selectedRow',
        function ($scope, $modal, $modalInstance, $filter, $interval, selectedRow) {

            $scope.selectedRow = selectedRow;

            $scope.ok = function () {
                $scope.selectedRow = null;
                $modalInstance.close();
            };

            $scope.cancel = function () {
                $scope.selectedRow = null;
                $modalInstance.dismiss('cancel');
            };
        }
    ]);

