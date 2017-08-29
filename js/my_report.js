$(function () {
    var Requests = GetRequests();
    var id = Requests['id'];
    var uid = localStorage.getItem('uid');
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
                url: httpUrl+'/cn/wap-api/assessment-record',
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