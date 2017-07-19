/**
 * Created by Administrator on 2017/7/14.
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
        $scope.toggle = {
            now: false
        };

        $http({
            method: 'post',
            url: httpUrl + '/cn/wap-api/raiders-detail',
            data: {
                contentid:id
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function (data) {
            $scope.http = httpUrl;
            $scope.http2 = httpUrl2;
            $scope.content=data.data[0];
            $scope.rank=data.ranking;
            $scope.sell=data.selling;
            var regExp = new RegExp("files|/files", 'g');
            $scope.contenttext=$sce.trustAsHtml(escape2Html(data.data[0].alternatives.replace(regExp,'http://www.smartapply.cn/files')));

        });

    }]);
});