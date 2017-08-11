/**
 * Created by Administrator on 2017/8/8.
 */
$(function () {
    var Requests = GetRequests();
    var id = Requests['id'];
    //        手风琴效果
    $(document).on('click','.link',function(even){
        var ev = even || window.event;
        var target = ev.target || ev.srcElement;
        $(target).parents('li').toggleClass("open");
        $(target).next('.submenu').slideToggle();
        $(target).parents("li").siblings('li').removeClass('open');
        $(target).parents("li").siblings('li').find('.submenu').slideUp();
    });
    $('#major_name').focus(function(){
        $('#accordion').slideDown();
    });
    $('#major_name2').focus(function(){
        $('#accordion2').slideDown();
    });
//        获取专业id
    $(document).on('click','#accordion .major_name',function(even){
        var ev = even || window.event;
        var target = ev.target || ev.srcElement;
        var major=$(target).html();
        var id=$(target).attr('data-id');
        var pid=$(target).attr('data-pid');
        $('#major_name').val(major);
        $('#major_name').attr('data-id',id);
        $('#major_name').attr('data-pid',pid);
        $('#accordion').slideUp();
    });

    $(document).on('click','#accordion2 .major_name',function(even){
        var ev = even || window.event;
        var target = ev.target || ev.srcElement;
        var major=$(target).html();
        var id=$(target).attr('data-id');
        var pid=$(target).attr('data-pid');
        $('#major_name2').val(major);
        $('#major_name2').attr('data-id',id);
        $('#major_name2').attr('data-pid',pid);
        $('#accordion2').slideUp();
    });

//        上一步切换
    $('.next_step_btn span.pre_st').click(function () {
        var num = $(this).attr('data-index');
        $('.step_wrap').eq(num).addClass("on").siblings('.step_wrap').removeClass("on");
        $('.step_wrap2').eq(num).show().siblings('.step_wrap2').hide();
    });
   //下一步切换
    $('.next_1').click(function(){
        var gpa=$('#gpa').val();
        var gmat=$('#gmat').val();
        var gre=$('#gre').val();
        var toefl=$('#toefl').val();
        var ielts=$('#ielts').val();
        if(!gpa){
            alert("请注意必填项");

        }
        if(isNaN(gpa)||isNaN(gmat)||isNaN(gre)||isNaN(toefl)||isNaN(ielts)){
            alert('当前页只能输入数值！');
            return false;
        }
        if (gpa<2||gpa>5){
            alert('gpa数值填写范围为2.0-5.0！');
            return false;
        }
        //if (gmat<400||gmat>780){
        //    alert('gmat数值填写范围为400-800！');
        //    return false;
        //}
        //if (gre<200||gre>340){
        //    alert('gre数值填写范围为200~340！');
        //    return false;
        //}
        //if (toefl<60||toefl>120){
        //    alert('toefl数值填写范围为60~120！');
        //    return false;
        //}
        //if (ielts<5||ielts>7){
        //    alert('ielts数值填写范围为5.0~9.0！');
        //    return false;
        //}

        var num = $(this).attr('data-index');
        $('.step_wrap').eq(num).addClass("on").siblings('.step_wrap').removeClass("on");
        $('.step_wrap2').eq(num).show().siblings('.step_wrap2').hide();

    });
    $(".next_2").click(function(){
        var school_name=$('#jd_school').val();
        var major_id=$('#major_name').attr('data-id');
        var major_name=$('#major_name').val();
        if(!school_name||!major_name){
            alert("请注意必填项！");
            return false;
        }
        if (major_id==0){
            alert('请选择正确的专业名称！');
            return false;
        }
        var num = $(this).attr('data-index');
        $('.step_wrap').eq(num).addClass("on").siblings('.step_wrap').removeClass("on");
        $('.step_wrap2').eq(num).show().siblings('.step_wrap2').hide();
    });
    $('.next_3').click(function(){
        var num = $(this).attr('data-index');
        $('.step_wrap').eq(num).addClass("on").siblings('.step_wrap').removeClass("on");
        $('.step_wrap2').eq(num).show().siblings('.step_wrap2').hide();
    });
    //提交
    $('.st_tj').click(function(){
       var gpa=$('#gpa').val();
       var gmat=$('#gmat').val();
       var gre=$('#gre').val();
       var toefl=$('#toefl').val();
       var ielts=$('#ielts').val();
       var xl=$('#s1').val();
       var school_rank=$('#s2').val();
       var major_top=$('#major_name').attr('data-id');
       var school_major=$('#major_name').attr('data-pid');
       var work_where=[[0,$('#s3').val()]];
       var work_exp=[$('#work_exp').val()];
       var item_exp=[$('#project_exp').val()];
       var you_xue=[$('#abroad_study').val()];
       var gong_yi=[$('#gy_active').val()];
       var huo_j=[$('#hj_jl').val()];
       var state=$('#abroad_state').val();
       var major=$('#major_name2').attr('data-id');
        var item={
            gpa:'',
            gmat:'',
            gre:'',
            toefl:'',
            ielts:'',
            xl:'',
            school_rank:'',
            major_top:'',
            school_major:'',
            work_where:'',
            work_exp:'',
            item_exp:'',
            you_xue:'',
            gong_yi:'',
            huo_j:'',
            state:'',
            major:''
        };
        if(!$('#major_name2').val()){
            alert('请选择正确的专业名称！');
            return false;
        }
        if(major==0){
            alert('请选择正确的专业名称！');
            return false;
        }else {
            item={
                gpa:gpa,
                gmat:gmat,
                gre:gre,
                toefl:toefl,
                ielts:ielts,
                xl:xl,
                school_rank:school_rank,
                major_top:major_top,
                school_major:school_major,
                work_where:work_where,
                work_exp:work_exp,
                item_exp:item_exp,
                you_xue:you_xue,
                gong_yi:gong_yi,
                huo_j:huo_j,
                state:state,
                major:major
            };
            sessionStorage.setItem('matching_item',JSON.stringify(item));
            location.href='matching_report.html';
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
            $scope.major=data.major;
            $scope.country=data.country;

        });

    }]);
});