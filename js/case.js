/**
 * Created by Administrator on 2017/7/4.
 */
$(function() {
    var Requests = GetRequests();
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
    myApp.controller("abroad_view",["$scope","$http","$sce",function($scope,$http,$sce){
        $http({
            url: httpUrl+'/cn/wap-api/case',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(data) {
            $scope.http = httpUrl;
            $scope.http2 = httpUrl2;
            $scope.items1=data.hot;
            $scope.items2=data.usa;
            $scope.items3=data.britain;
            $scope.items4=data.europe;
            $scope.items5=data.canada;
            $scope.items6=data.singapore;
        });


    }]);
});
