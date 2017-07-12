/**
 * Created by Administrator on 2017/6/29.
 */
$(function() {
    var Requests = GetRequests();
    var id = Requests['id'];
    var pid = Requests['tagId'];
    var tagStr = Requests['tagStr'];
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
    //通过模块生成调用控制器
    myApp.controller("abroad_view",["$scope","$http","$sce",function($scope,$http,$sce){
        $http({
            method: 'get',
            url: httpUrl+'/cn/wap-api/index',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(data) {
            $scope.http = httpUrl;
            $scope.http2 = httpUrl2;
            $scope.question=data.question;
            $scope.case=data.case;
            $scope.item1=data.school.school[0];
            $scope.item2=data.school.school[1];
            $scope.item3=data.school.school[2];
            $scope.item4=data.school.school[3];
            $scope.item5=data.school.school[4];
            $scope.item6=data.school.school[5];
        });


    }]);
});
