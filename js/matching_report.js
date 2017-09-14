/**
 * Created by Administrator on 2017/8/9.
 */
$(function () {
    var Requests = GetRequests();
    var id = Requests['id'];
    var uid = localStorage.getItem('uid');
    var report_item = $.parseJSON(sessionStorage.getItem('matching_item'));
    if(!uid){
        alert("请先登录！");
        location.href='login.html'
    }
    console.log(report_item);
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
            url: httpUrl+'/cn/wap-api/school-result',
            //url: 'http://www.smartapply.cn/cn/wap-api/odds-storage',
            data: {
                uid:uid,
                id:id
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function (data) {
            $scope.http = httpUrl;
            $scope.http2 = httpUrl2;
            $scope.score=data.data.score;
            $scope.info=data.score;
            $scope.user=data.user;
            if(data.data.res==''){
                alert("暂无当前数据，您可以重新选择留学专业！")
            }else {
                $scope.res=data.data.res;
            }

        });

    }]);
});
