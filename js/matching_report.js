/**
 * Created by Administrator on 2017/8/9.
 */
$(function () {
    var Requests = GetRequests();
    var report_item = $.parseJSON(sessionStorage.getItem('matching_item'));
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
            url: 'http://test.school.gmatonline.cn/cn/wap-api/school-choice',
            data: {
                result_gpa:report_item.gpa,
                result_gmat:report_item.gmat,
                result_gre:report_item.gre,
                result_toefl:report_item.toefl,
                result_ielts:report_item.ielts,
                school:report_item.school_rank,
                major_top:report_item.school_major,
                school_major:report_item.major_top,
                work:report_item.work_where,
                live:report_item.work_exp,
                project:report_item.item_exp,
                studyTour:report_item.you_xue,
                active:report_item.gong_yi,
                price:report_item.huo_j,
                destination:report_item.state,
                major:report_item.major
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function (data) {
            $scope.http = httpUrl;
            $scope.http2 = httpUrl2;
            $scope.score=data.score;
            if(data.res==''){
                alert("暂无当前数据，您可以重新选择留学专业！")
            }else {
                $scope.res=data.res;
            }

        });

    }]);
});
