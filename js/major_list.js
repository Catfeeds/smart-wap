/**
 * Created by Administrator on 2017/8/22.
 */
$(function () {
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
    myApp.filter('nullImg', function () {
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
        $scope.toggle = {
            now: false
        };
        $http({
            method: 'post',
            url: httpUrl + '/cn/wap-api/major-list',
            data: {
                //catId:
                page: 1
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function (data) {
            $scope.http = httpUrl;
            $scope.http2 = httpUrl2;
            $scope.category = data.category;
            $scope.data = data.data.data;
            //var regExp = new RegExp("、|,", 'g');
            //for (var i = 0; i < $scope.data.length; i++) {
            //    $scope.school= $scope.data[i].school;
            //    console.log($scope.school);
                //for (var j = 0; j < $scope.school.length; j++) {
                //    $scope.schoolItem = $scope.school[j];
                //    console.log($scope.school[j])
                //}

                //console.log($scope.data[i].school.split(regExp))
            //}
        });
        $scope.chosedIndex = 0;
        $scope.changeId=function($index,catId){
            $scope.chosedIndex = $index;
            $http({
                method: 'post',
                url: httpUrl + '/cn/wap-api/major-list',
                data: {
                    catId:catId,
                    page: 1
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function (data) {
                $scope.http = httpUrl;
                $scope.http2 = httpUrl2;
                $scope.category = data.category;
                $scope.data = data.data.data;
            });
        }

    }]);

});