/**
 * Created by Administrator on 2017/7/26.
 */
$(function () {
    var Requests = GetRequests();
    var id = Requests['id'];
    var page = parseInt(Requests['page']);

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
    myApp.filter('nullImg', function () {
        return function (img) {
            if(img){
                return httpUrl+img;
            }else {
                return 'images/test_img.png';
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
            url: httpUrl+'/cn/wap-api/raiders-list',
            data:{
                raidersId:id,
                page:page
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function (data) {
            $scope.http = httpUrl;
            $scope.http2 = httpUrl2;
            $scope.title = data.class;
            $scope.data=data.data.data;
            $scope.pageSize=data.data.pageStr;
        });

    }]);

    $(document).on("click",".iPage",function(){
        $(this).addClass("on").siblings("li").removeClass("on");
        var page=$(this).html();
        location.href='strategy_list.html?id='+id+'&page='+page+'';
    });
    $(document).on("click",".prev",function(){
        $(this).addClass("on").siblings("li").removeClass("on");
        location.href='strategy_list.html?id='+id+'&page='+(page-1)+'';
    });
    $(document).on("click",".next",function(){
        $(this).addClass("on").siblings("li").removeClass("on");
        location.href='strategy_list.html?id='+id+'&page='+(page+1)+'';
    });
});