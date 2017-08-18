/**
 * Created by Administrator on 2017/8/18.
 */
$(function () {
    //tab切换
    $('.list_tab span').click(function(){
        var num=$(this).index();
        $(this).addClass('on').siblings('span').removeClass('on');
        //$('.tab_item_wrap .tab_item').eq(num).fadeIn().siblings('ul.tab_item').hide();
    });
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
    myApp.filter('nullImg', function ($sce) {
        return function (img) {
            if (img) {
                return httpUrl + img;
            } else {
                return 'images/default.png';
            }
        }
    });
    //通过模块生成调用控制器
    myApp.controller("abroad_view", ["$scope", "$http", "$sce", function ($scope, $http, $sce) {
        $http({
            method: 'post',
            url: httpUrl + '/cn/wap-api/mechanism',
            data: {
                sort: 0
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function (data) {
            $scope.http = httpUrl;
            $scope.http2 = httpUrl2;
            $scope.data=data.data;
        });

        $scope.sort=function(sort){
            $http({
                method: 'post',
                url: httpUrl + '/cn/wap-api/mechanism',
                data: {
                    sort: sort
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function (data) {
                $scope.http = httpUrl;
                $scope.http2 = httpUrl2;
                $scope.data=data.data;
            });
        }

    }]);
});
