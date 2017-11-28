$(function () {
    //声明模块

    var myApp = angular.module("myApp", []);
    myApp.directive('isOver', function () {
        return {
            restrict: 'A',
            scope: {
                over: '=isOver'
            },
            link: function (scope, elm, attr) {
                if (scope.$parent.$last) {
                    scope.over = true;
                }
            }
        }
    });
    myApp.filter('trustHtml', function ($sce) {
        return function (content) {
            return $sce.trustAsHtml(content);
        }
    });

    //通过模块生成调用控制器
    myApp.controller("abroad_view", ["$scope", "$http", "$sce", function ($scope, $http, $sce) {
        $scope.toggle = {
            now: false
        };
        $scope.$watch('toggle.now', function () {
            if ($scope.toggle.now) {

            }
        });
        $http({
            method: 'get',
            url: 'http://www.smartapply.cn/cn/wap-api/get-document ',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {}
        }).success(function (data) {
           $scope.ws=data;

        });

    }]);
});