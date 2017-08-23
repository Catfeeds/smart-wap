/**
 * Created by Administrator on 2017/8/8.
 */
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
        if (!uid) {
            alert('请先登录！');
            location.href = 'login.html';

        } else {
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
        }


    }]);
    $('.next_1').click(function () {
        var gpa = $('#gpa').val();
        var gmat = $('#gmat').val();
        var toefl = $('#toefl').val();
        var num = $(this).attr('data-index');
        if (!gpa || !toefl) {
            alert('注意必填项！');
            return false;
        }
        if (isNaN(gpa) || isNaN(gmat) || isNaN(toefl)) {
            alert("请输入正确的科目分数！");
            return false;
        }
        if (gpa) {
            if ((gpa < 2.5) || (gpa > 100) || ((gpa > 4) && (gpa < 50))) {
                alert("gpa数值填写范围为2.5-4.0或者50-100！");
                return false;
            }
        } else {
            alert("GPA为必填项！");
            return false;
        }
        if (gmat) {
            if ((gmat < 200)) {
                alert("gre数值填写范围为200-340，gmat数值填写范围为400-800");
                return false;
            }
            if ((gmat > 340) && (gmat < 400)) {
                alert("gre数值填写范围为200-340，gmat数值填写范围为400-800");
                return false;
            }
            if ((gmat > 800)) {
                alert("gre数值填写范围为200-340，gmat数值填写范围为400-800");
                return false;
            }
        }
        if (toefl) {
            if ((toefl < 5)) {
                alert("toefl数值填写范围为60-120！,ielts数值填写范围为5.0-9.0！");
                return false;
            }
            if ((toefl > 120)) {
                alert("toefl数值填写范围为60-120！,ielts数值填写范围为5.0-9.0！");
                return false;
            }
            if ((toefl < 60) && (toefl > 9)) {
                alert("toefl数值填写范围为60-120！,ielts数值填写范围为5.0-9.0！");
                return false;
            }
        } else {
            alert("TOEFL/IELTS为必填项！");
            return false;
        }
        if (num == 1) {
            $('.pro_inner').stop(true).animate({"width": "50%"}, 200, function () {
                $('.jd_num').html('50%');
            })
        }
        $('.mc_step_tit').eq(num).show().siblings('.mc_step_tit').hide();
        $('.step_wrap2').eq(num).show().siblings('.step_wrap2').hide();

    });
    $('.prev_step').click(function(){
        var num = $(this).attr('data-index');
        if (num != 1) {
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
        var toefl = $('#toefl').val();
        var education = $('#s1').val();
        var school = $('#s2').val();
        var school_name = $('#school').val();
        var major = $('#s3').val();
        if ((education==0)||(school==0)||(!school_name)) {
            alert("请注意必填项！");
            return false;
        } else {
            $.ajax({
                type: 'post',
                url: httpUrl + '/cn/api/odds-result',
                data: {
                    gpa: gpa,
                    gmat: gmat,
                    toefl: toefl,
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
