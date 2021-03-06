/**
 * Created by Earl on 6/17/2015.
 */
var myApp = angular.module('myApp', ["ui.router",'myControllers','ui.grid', 'ui.grid.saveState', 'ui.grid.selection', 'ui.grid.cellNav', 'ui.grid.resizeColumns', 'ui.grid.moveColumns', 'ui.grid.pinning', 'ui.bootstrap', 'ui.grid.autoResize','angular-loading-bar', 'ui.tree' ]);


myApp.config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/dashboard");
    //
    // Route State Setup
    $stateProvider
        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "app/components/home/views/dashboard.html"
        })
        .state('SMBRTPA', {
            url: "/SMBRTPA",
            templateUrl: "app/components/SMBRTPA/views/MainSMBView.html"
        })
        .state('FAST', {
            url: "/FAST",
            templateUrl: "app/components/FAST/views/MainFASTView.html"
        })
        .state('state1.list', {
            url: "/list",
            templateUrl: "state1.list.html",
            controller: function($scope) {
                $scope.items = ["A", "List", "Of", "Items"];
            }
        })
        .state('ConsumerRTPA', {
            url: "/ConsumerRTPA",
            templateUrl: "app/components/consumerRTPA/views/MainConsumerView.html"
        })
        .state('state2.list', {
            url: "/list",
            templateUrl: "state2.list.html",
            controller: function($scope) {
                $scope.things = ["A", "Set", "Of", "Things"];
            }
        })
        .state('orderHistoryList', {
            url: "/orderHistoryList",
            templateUrl: "app/components/consumerRTPA/views/orderHistoryList.html"
        })


});




myApp.directive('modal', function () {
    return {
        template: '<div class="modal fade">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div cslass="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
        '<h4 class="modal-title">{{ title }}</h4>' +
        '</div>' +
        '<div class="modal-body" ng-transclude></div>' +
        '</div>' +
        '</div>' +
        '</div>',
        restrict: 'E',
        transclude: true,
        replace:true,
        scope:true,
        link: function postLink(scope, element, attrs) {
            scope.title = attrs.title;

            scope.$watch(attrs.visible, function(value){
                if(value == true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function(){
                scope.$apply(function(){
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function(){
                scope.$apply(function(){
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
});


