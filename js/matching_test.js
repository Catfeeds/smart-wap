/**
 * Created by Administrator on 2017/8/8.
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
    //通过模块生成调用控制器
    myApp.controller("abroad_view", ["$scope", "$http", "$sce", function ($scope, $http, $sce) {
        $http({
            method: 'post',
            url: 'http://test.school.gmatonline.cn/cn/wap-api/odds-evaluation ',
            data: {
                schoolId: id
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function (data) {
            $scope.http = httpUrl;
            $scope.http2 = httpUrl2;
            $scope.data = data.data;
            $scope.major = data.major;

        });

    }]);
    //上下页切换
    $('.next_step_btn span').not('.st_tj').click(function () {
        var num = $(this).attr('data-index');
        if (num == 1) {
            $('.pro_inner').stop(true).animate({"width": "50%"}, 200, function () {
                $('.jd_num').html('50%');
            })
        }
        else {
            $('.pro_inner').stop(true).animate({"width": "0%"}, 200, function () {
                $('.jd_num').html('0%');
            })
        }
        $('.mc_step_tit').eq(num).show().siblings('.mc_step_tit').hide();
        $('.step_wrap2').eq(num).show().siblings('.step_wrap2').hide();
    });
    //提交
    $('.st_tj').click(function () {
        var gpa = $('#gpa').val();
        var gmat = $('#gmat').val();
        var gre = $('#gre').val();
        var toefl = $('#toefl').val();
        var ielts = $('#ielts').val();
        var education = $('#s1').val();
        var school = $('#s2').val();
        var major = $('#s3').val();
        if (isNaN(gpa, gmat, gre, toefl, ielts)) {
            alert("请输入正确的科目分数！");
            return false;
        } else {
            $.ajax({
                type: 'post',
                url: httpUrl + '/cn/api/odds-result',
                data: {
                    gpa: gpa,
                    gmat: gmat,
                    gre: gre,
                    toefl: toefl,
                    ielts: ielts,
                    education: education,
                    school: school,
                    major: major
                },
                dataType: 'json',
                success: function (data) {
                    if (data.code == 0) {
                        alert(data.message)
                    }
                    if (data.code == 1) {
                        $('.pro_inner').stop(true).animate({"width": "100%"}, 200, function () {
                            $('.jd_num').html('100%');
                        });
                        $('.success_model').fadeIn();
                        $('.str_sort').html(data.data);
                        if (data.data < 50) {
                            $('.bfb_sort').html("40%");
                        }
                        if (data.data < 60 && data.data > 50) {
                            $('.bfb_sort').html("50%");
                        }
                        if (data.data < 70 && data.data > 60) {
                            $('.bfb_sort').html("60%");
                        }
                        if (data.data < 80 && data.data > 70) {
                            $('.bfb_sort').html("70%");
                        }
                        if (data.data < 90 && data.data > 80) {
                            $('.bfb_sort').html("80%");
                        }
                        if (data.data < 99 && data.data > 90) {
                            $('.bfb_sort').html("89%");
                        }
                    }
                }
            })
        }
    });
    //结果页
    $('.success_model').click(function () {
        $(this).fadeOut();
    });

});
