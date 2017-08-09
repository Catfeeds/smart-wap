/**
 * Created by Administrator on 2017/7/26.
 */
/**
 * Created by Administrator on 2017/7/26.
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
        $http({
            method: 'post',
            url: httpUrl + '/cn/wap-api/case-detail',
            data: {
                contentId: id
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function (data) {
            $scope.http = httpUrl;
            $scope.http2 = httpUrl2;
            $scope.data=data[0];
            var regExp = new RegExp("files|/files", 'g');
            $scope.contenttext=$sce.trustAsHtml(escape2Html(data[0].answer.replace(regExp,'http://www.smartapply.cn/files')));


        });
    }]);

});