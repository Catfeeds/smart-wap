/**
 * Created by Administrator on 2017/8/8.
 */
$(function () {
    var Requests = GetRequests();
    var id = Requests['id'];
    var uid = localStorage.getItem('uid');
    if(!uid){
        alert('请先登录！');
        location.href='login.html';
    }
    //        手风琴效果
    $(document).on('click', '.link', function (even) {
        var ev = even || window.event;
        var target = ev.target || ev.srcElement;
        $(target).parents('li').toggleClass("open");
        $(target).next('.submenu').slideToggle();
        $(target).parents("li").siblings('li').removeClass('open');
        $(target).parents("li").siblings('li').find('.submenu').slideUp();
    });
    $('#major_name').focus(function () {
        $('#accordion').slideDown();
    });
    $('#major_name2').focus(function () {
        $('#accordion2').slideDown();
    });
//        获取专业id
    $(document).on('click', '#accordion .major_name', function (even) {
        var ev = even || window.event;
        var target = ev.target || ev.srcElement;
        var major = $(target).html();
        var id = $(target).attr('data-id');
        var pid = $(target).attr('data-pid');
        $('#major_name').val(major);
        $('#major_name').attr('data-id', id);
        $('#major_name').attr('data-pid', pid);
        $('#accordion').slideUp();
    });

    $(document).on('click', '#accordion2 .major_name', function (even) {
        var ev = even || window.event;
        var target = ev.target || ev.srcElement;
        var major = $(target).html();
        var id = $(target).attr('data-id');
        var pid = $(target).attr('data-pid');
        $('#major_name2').val(major);
        $('#major_name2').attr('data-id', id);
        $('#major_name2').attr('data-pid', pid);
        $('#accordion2').slideUp();
    });

//        上一步切换
    $('.next_step_btn span.pre_st').click(function () {
        var num = $(this).attr('data-index');
        $('.step_wrap').eq(num).addClass("on").siblings('.step_wrap').removeClass("on");
        $('.step_wrap2').eq(num).show().siblings('.step_wrap2').hide();
    });
    //下一步切换
    $('.next_1').click(function () {
        var gpa = $('#gpa').val();
        var gmat = $('#gmat').val();
        var toefl = $('#toefl').val();
        var num = $(this).attr('data-index');
        if (!gpa || !toefl) {
            alert('注意必填项！');
            return false;
        }
        if (isNaN(gpa) || isNaN(toefl)) {
            alert("请输入正确的科目分数！");
            return false;
        }
        if (gpa) {
            if ((gpa < 2.5) || (gpa > 100) || ((gpa > 4) && (gpa < 50))) {
                alert("gpa数值填写范围为2.5-4.0或者50-100！");
                return false;
            }
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
        }
        $('.step_wrap').eq(num).addClass("on").siblings('.step_wrap').removeClass("on");
        $('.step_wrap2').eq(num).show().siblings('.step_wrap2').hide();

    });
    $(".next_2").click(function () {
        var school_name = $('#jd_school').val();
        var major_id = $('#major_name').attr('data-id');
        var major_name = $('#major_name').val();
        if (!school_name || !major_name) {
            alert("请注意必填项！");
            return false;
        }
        if (major_id == 0) {
            alert('请选择正确的专业名称！');
            return false;
        }
        var num = $(this).attr('data-index');
        $('.step_wrap').eq(num).addClass("on").siblings('.step_wrap').removeClass("on");
        $('.step_wrap2').eq(num).show().siblings('.step_wrap2').hide();
    });
    $('.next_3').click(function () {
        var num = $(this).attr('data-index');
        $('.step_wrap').eq(num).addClass("on").siblings('.step_wrap').removeClass("on");
        $('.step_wrap2').eq(num).show().siblings('.step_wrap2').hide();
    });
    //提交
    $('.st_tj').click(function () {
        var gpa = $('#gpa').val();
        var gmat = $('#gmat').val();
        var toefl = $('#toefl').val();
        var xl = $('#s1 option:selected').text();//目前学历
        var school_rank = $('#s2').val();//学校等级
        var schoolName=$('#jd_school').val();//目前学校名称
        var major_top = $('#major_name').attr('data-id');//目前专业 id
        var school_major = $('#major_name').attr('data-pid');//目前专业PID
        var work_where = [[0, $('#s3').val()]];//实习地等级
        var work_exp = [$('#work_exp').val()];//工作经验
        var item_exp = [$('#project_exp').val()];//项目经验
        var you_xue = [$('#abroad_study').val()];//游学经历
        var gong_yi = [$('#gy_active').val()];//公益经历
        var huo_j = [$('#hj_jl').val()];//获奖经历
        var state = $('#abroad_state').val();//留学目的地
        var major = $('#major_name2').attr('data-id');//需要申请的专业ID
        var major_name=$('#major_name').val();//目前专业名
        var major_name2=$('#major_name2').val();//申请专业名
        if (!$('#major_name2').val()) {
            alert('请选择正确的专业名称！');
            return false;
        }
        if (major == 0) {
            alert('请选择正确的专业名称！');
            return false;
        } else {
            $.ajax({
                type: 'post',
                url: httpUrl+'/cn/wap-api/school-storage',
                data: {
                    uid:uid,
                    result_gpa:gpa,
                    result_gmat:gmat,
                    result_toefl:toefl,
                    education:xl,//目前学历
                    school:school_rank,//就读院校等级
                    schoolName:schoolName,//目前学校名称
                    major_name1:major_name,//当前专业名
                    major_top:school_major,//专业方向(id)
                    school_major:major_top,//详细专业(id)
                    work:work_where,//实习地等级
                    live:work_exp,//工作经验
                    project:item_exp,//项目经验
                    studyTour:you_xue,//游学经历
                    active:gong_yi,//公益经历
                    price:huo_j,//获奖经历
                    destination:state,//申请国家
                    major:major,//申请专业id
                    major_name2:major_name2//申请专业名
                },
                dataType: 'json',
                success:function(data){
                    if(data.code=1){
                        location.href = 'matching_report.html';
                    }else {
                        alert(data.message);
                    }

                }
            })

        }
    });
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
            url: 'http://test.school.gmatonline.cn/cn/api/major-country',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function (data) {
            $scope.http = httpUrl;
            $scope.http2 = httpUrl2;
            $scope.major = data.major;
            $scope.country = data.country;

        });

    }]);
});