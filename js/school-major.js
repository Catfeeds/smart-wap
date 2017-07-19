/**
 * Created by Administrator on 2017/7/13.
 */
$(function () {
    var Requests = GetRequests();
    var id = Requests['id'];
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
        $http({
            method: 'post',
            url: 'http://test.school.gmatonline.cn/cn/wap-api/major-detail',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                majorid: id
            }
        }).success(function (data) {
            $scope.http = httpUrl;
            $scope.http2 = httpUrl2;
            $scope.school = data.school;
            $scope.hot = data.hot;
            $scope.major=data.majori;
            $scope.link=data.link;
        });

    }]);
});