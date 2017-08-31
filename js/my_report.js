$(function () {
    var Requests = GetRequests();
    var type = Requests['type'];//type=1选校评估type=2录取测评
    var uid = localStorage.getItem('uid');
    var as_url='';
    if(type==1){
        $("title").text('我的选校报告');
        $(".header_name ").text('我的选校报告');
        as_url='school-record';
    }
    if(type==2){
        $("title").text('我的录取报告');
        $(".header_name ").text('我的录取报告');
        as_url='assessment-record';
    }
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
    myApp.filter('nullData', function ($sce) {
        return function (data) {
            if(!data){
                return '未匹配到相关数据';
            }
            else {

                return data;
            }

        }
    });
    //通过模块生成调用控制器
    myApp.controller("abroad_view", ["$scope", "$http", "$sce", function ($scope, $http, $sce) {
        $scope.oj_type=type;
            $http({
                method: 'post',
                url: httpUrl+'/cn/wap-api/'+as_url,
                data: {
                    uid: uid
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function (data) {
                $scope.http = httpUrl;
                $scope.http2 = httpUrl2;
                $scope.data = data.data;
                console.log(data)
            });



    }]);
});