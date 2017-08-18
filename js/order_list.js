/**
 * Created by Administrator on 2017/8/17.
 */
$(function () {
    var Requests = GetRequests();
    var uid = localStorage.getItem("uid");
    var page= 1;
    var status= '';
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
            if(!img){
                return 'images/default.png';
            }
            else {

                return httpUrl+img;
            }

        }
    });
    //通过模块生成调用控制器
    myApp.controller("abroad_view", ["$scope", "$http", "$sce", function ($scope, $http, $sce) {
        $scope.toggle = {
            now: false
        };

            $http({
                method: 'post',
                url: httpUrl + '/cn/wap-api/my-order',
                data: {
                    uid:uid,
                    page:page,
                    status:3
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function (data) {
                $scope.http = httpUrl;
                $scope.http2 = httpUrl2;
                $scope.data=data.data;
                $scope.pageStr=data.pageStr;
            });

        $scope.tabChange=function(status){
            $http({
                method: 'post',
                url: httpUrl + '/cn/wap-api/my-order',
                data: {
                    uid:uid,
                    page:page,
                    status:status
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function (data) {
                $scope.http = httpUrl;
                $scope.http2 = httpUrl2;
                $scope.data=data.data;
                $scope.pageStr=data.pageStr;
            });
        };

    }]);
});