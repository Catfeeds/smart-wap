/**
 * Created by Administrator on 2017/8/8.
 */
$(function () {
    var Requests = GetRequests();
    var id = Requests['id'];
    var uid = localStorage.getItem('uid');
    if (!uid) {
        alert("请先登录！");
        location.href = 'login.html'
    }
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
                $scope.country = data.country;
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
        // $('.sel_search_wrap').hide();

    });
    // 第二步
    $('.next_2').click(function () {
        var num = $(this).attr('data-index');
        var education = $('#s1 option:selected').text();//目前学历
        var school = $('#s2').val();//学校等级
        var school_name = $('#school').val();//当前就读学校名称
        var c_major = $('#c_major').val();//目前专业
        if ((education == '未选择') || (school == 0) || (!school_name) || (!c_major)) {
            alert("请注意必填项！");
            return false;
        }
        if (num == 2) {
            $('.pro_inner').stop(true).animate({"width": "100%"}, 200, function () {
                $('.jd_num').html('100%');
            })
        }
        $('.mc_step_tit').eq(num).show().siblings('.mc_step_tit').hide();
        $('.step_wrap2').eq(num).show().siblings('.step_wrap2').hide();
    });
    // 上一步
    $('.prev_step').click(function () {
        var num = $(this).attr('data-index');
        if (num == 0) {
            $('.pro_inner').stop(true).animate({"width": "0%"}, 200, function () {
                $('.jd_num').html('0%');
            });
            // $('.sel_search_wrap').show();
        }
        if (num == 1) {
            $('.pro_inner').stop(true).animate({"width": "50%"}, 200, function () {
                $('.jd_num').html('50%');
            })
        }
        $('.mc_step_tit').eq(num).show().siblings('.mc_step_tit').hide();
        $('.step_wrap2').eq(num).show().siblings('.step_wrap2').hide();
    });
    // 搜索院校

    $("#sr_sc").bind("input propertychange", function () {
        var keywords=$(this).val();
        $('.src_wrap').addClass('src_on');
        search(keywords);

    });
    $('.sel_1').click(function () {
        var keywords=$('#sr_sc').val();
        $('.src_wrap').addClass('src_on');
        search(keywords);
    });
    // 选择搜索的院校
    $(document).on('click','.sr_list li',function () {
        var sc_id=$(this).attr('sc-id');
        var sc_rank=$(this).attr('sc-rank');
        var country=$(this).attr('country-num');
        var sq_name2=$(this).find('b').text();
        $('#step1_id').val(sc_id);//申请院校ID
        $('#country').val(country);//申请院校国家
        $('#sc_rank').val(sc_rank);//申请院校排名
        $('#sq_name2').val(sq_name2);//申请院校名称
        $('#sr_sc').val(sq_name2);
        $('.sr_wrap').hide();
        if(!sc_id){
            alert('请选择院校！');
            return false;
        }else {
            $.ajax({
                type: 'get',
                url: 'http://test.school.gmatonline.cn/cn/api/id-major',
                data: {
                    id:sc_id
                },
                dataType: 'json',
                success:function (data){
                    $('#sel_sc').empty();
                    var str='';
                    $(data).each(function (i,j) {
                        str+='<option value="'+data[i].id+'">'+data[i].name+'</option>'
                    });
                    $('#sel_sc').append(str);
                }
            })
        }
    });
    $(document).click(function (even) {
        var ev = even || window.event;
        var target = ev.target || ev.srcElement;
        var flag = $(target).parents('.src_wrap ').is(".src_on");
        if (!flag) {
            if ($(".src_wrap").hasClass("src_on")) {
                $('.sr_wrap').hide();
                $(".src_wrap").removeClass("src_on");
            }
        }

    });
    // $('#sr_sc').blur(function () {
    //     $('.sr_wrap').hide();
    // });
    //提交
    $('.st_tj').click(function () {
        var sc_id=$('#step1_id').val();//隐藏框 申请院校ID；
        var gpa = $('#gpa').val();
        var gmat = $('#gmat').val();
        var toefl = $('#toefl').val();
        var country=$('#country').val();//隐藏框 申请院校国家
        // var sq_name=$('#sq_name').val();//隐藏框 申请的学校名称
        var sq_name=$('#sq_name2 ').val();//隐藏框 申请的学校名称
        var sc_rank=$('#sc_rank').val();//隐藏框 申请院校排名
        var education = $('#s1 option:selected').text();//目前学历
        var school = $('#s2').val();//学校等级
        var school_name = $('#school').val();//当前就读学校名称
        // var major = $('#s3').val();//申请专业 ID
        // var major_name = $('#s3 option:selected').text();//申请专业 名称
        var major = $('#sel_sc').val();//申请专业 ID
        var major_name = $('#sel_sc option:selected').text();//申请专业 名称
        var c_major = $('#c_major').val();//目前专业
        var bigFour='';//四大
        var foreignCompany='';//外企
        var enterprises='';//国企
        var privateEnterprise='';//私企
        var project='';//项目
        var study='';//游学
        var publicBenefit='';//公益
        var awards='';//得奖
        if($('#checkbox1').is(':checked')){
            bigFour=$('#checkbox1').val();
        }
        if($('#checkbox2').is(':checked')){
            foreignCompany=$('#checkbox2').val();
        }
        if($('#checkbox3').is(':checked')){
            enterprises=$('#checkbox3').val();
        }
        if($('#checkbox4').is(':checked')){
            privateEnterprise=$('#checkbox4').val();
        }
        if($('#checkbox5').is(':checked')){
            project=$('#checkbox5').val();
        }
        if($('#checkbox6').is(':checked')){
            study=$('#checkbox6').val();
        }
        if($('#checkbox7').is(':checked')){
            publicBenefit=$('#checkbox7').val();
        }
        if($('#checkbox8').is(':checked')){
            awards=$('#checkbox8').val();
        }
        if(!sc_id){
            alert('请选择需要申请的院校！');
            return false;
        }else {

            $.ajax({
                type: 'post',
                url: httpUrl + '/cn/wap-api/odds-storage',
                data: {
                    uid:uid,
                    gpa: gpa,
                    gmat: gmat,
                    toefl: toefl,
                    country:country,
                    schoolName:sq_name,
                    schoolRank:sc_rank,
                    attendSchool:school_name,
                    education: education,
                    school: school,
                    major: c_major,
                    majorName: major_name,
                    bigFour:bigFour,
                    foreignCompany:foreignCompany,
                    enterprises:enterprises,
                    privateEnterprise:privateEnterprise,
                    project:project,
                    study:study,
                    publicBenefit:publicBenefit,
                    awards:awards

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
                        $.ajax({
                            type: 'post',
                            url: httpUrl + '/cn/wap-api/odds-result',
                            data: {
                                uid: uid
                            },
                            dataType: 'json',
                            success: function (data) {
                                $('.success_model').fadeIn();
                                $('.str_sort').html(data.data.percent);
                                if (data.data.percent < 50) {
                                    $('.bfb_sort').html("40%");
                                }
                                if (data.data.percent < 60 && data.data.percent > 50) {
                                    $('.bfb_sort').html("50%");
                                }
                                if (data.data.percent < 70 && data.data.percent > 60) {
                                    $('.bfb_sort').html("60%");
                                }
                                if (data.data.percent < 80 && data.data.percent > 70) {
                                    $('.bfb_sort').html("70%");
                                }
                                if (data.data.percent < 90 && data.data.percent > 80) {
                                    $('.bfb_sort').html("80%");
                                }
                                if (data.data.percent < 99 && data.data.percent > 90) {
                                    $('.bfb_sort').html("89%");
                                }
                            }

                        })
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
function search(keywords) {
    $.ajax({
        type: 'get',
        url: 'http://test.school.gmatonline.cn/cn/api/words-school',
        data: {
            keywords:keywords
        },
        dataType: 'json',
        success:function (data) {
            var str='';
            $('.sr_wrap').show();
            if(data.code==0){
                $('.sr_list').html('<li><b>'+data.message+'</b></li>');
            }
            if(data.code==1){
                $('.sr_list').empty();
                $(data.data).each(function (i,j) {
                    str+='<li sc-rank="'+data.data[i].rank+'" country-num="'+data.data[i].country+'" sc-id="'+data.data[i].id+'"><b>'+data.data[i].name+'</b><span>'+data.data[i].title+'</span></li>'
                });
                $('.sr_list').append(str);
            }


        }
    })
}
