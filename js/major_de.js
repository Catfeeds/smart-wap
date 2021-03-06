/**
 * Created by Administrator on 2017/8/23.
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
            url: httpUrl + '/cn/wap-api/major-detail',
            data: {
                id:id
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function (data) {
            $scope.http = httpUrl;
            $scope.http2 = httpUrl2;
            $scope.data = data;
            var regExp = new RegExp("、|,", 'g');
            $scope.school = data.duration.split(regExp);
            $scope.trainer = data.trainer.split(regExp);
            console.log($scope.trainer)
        });

    }]);
});