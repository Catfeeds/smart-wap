/**
 * Created by Administrator on 2017/7/26.
 */
$(function () {
    var Requests = GetRequests();
    var id = Requests['id'];
    var keyWord = Requests['keyWord'];
    var type = Requests['type'];
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
            if (img) {
                return httpUrl + img;
            } else {
                return 'images/test_img.png';
            }
        }
    });
    //通过模块生成调用控制器
    myApp.controller("abroad_view", ["$scope", "$http", "$sce", function ($scope, $http, $sce) {
        $scope.toggle = {
            now: false
        };
        //type=1搜索type=0案例库
        if(type==0){
            $http({
                method: 'post',
                url: httpUrl + '/cn/wap-api/case-list',
                data: {
                    page: page
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function (data) {
                $scope.http = httpUrl;
                $scope.http2 = httpUrl2;
                $scope.data=data.data;
                $scope.pageSize=data.pageStr;
            });
        }
        if(type==1){
            $http({
                method: 'post',
                url: httpUrl + '/cn/wap-api/select',
                data: {
                    word:keyWord,
                    page: page
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function (data) {
                $scope.http = httpUrl;
                $scope.http2 = httpUrl2;
                if(data.data.data=''){
                    alert('暂无当前数据！');
                }else {
                    $scope.data=data.data.data;
                    $scope.pageSize=data.data.pageStr;
                }

            });
        }


    }]);
    $(document).on("click",".iPage",function(){
        $(this).addClass("on").siblings("li").removeClass("on");
        var page=$(this).html();
        if(type==0){
            location.href='case_list.html?page='+page+'&type=0';
        }
        if (type==1){
            location.href='case_list.html?page='+page+'&type=1&keyWord='+keyWord+'';
        }

    });
    $(document).on("click",".prev",function(){
        $(this).addClass("on").siblings("li").removeClass("on");
        if(type==0){
            location.href='case_list.html?page='+(page-1)+'&type=0';
        }
        if (type==1){
            location.href='case_list.html?page='+(page-1)+'&type=1&keyWord='+keyWord+'';
        }
    });
    $(document).on("click",".next",function(){
        $(this).addClass("on").siblings("li").removeClass("on");
        if(type==0){
            location.href='case_list.html?page='+(page+1)+'&type=0';
        }
        if (type==1){
            location.href='case_list.html?page='+(page+1)+'&type=1&keyWord='+keyWord+'';
        }
    });
});