/**
 * Created by Administrator on 2017/8/18.
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
            url: httpUrl + '/cn/wap-api/mechanism-detail',
            data: {
                id: id
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function (data) {
            var regExp = new RegExp("、|,", 'g');
            var regExp2 = new RegExp("files|/files", 'g');
            $scope.http = httpUrl;
            $scope.http2 = httpUrl2;
            $scope.data=data[0];
            $scope.country=data[0].answer.split(regExp);
            $scope.contenttext=$sce.trustAsHtml(escape2Html(data[0].alternatives.replace(regExp2,'http://www.smartapply.cn/files')));
            console.log($scope.country)
        });

    }]);
});
