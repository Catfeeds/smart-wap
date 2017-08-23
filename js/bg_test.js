/**
 * Created by Administrator on 2017/8/23.
 */
$(function () {
    //上一步
    $('.pre_st').click(function(){
        var num = $(this).attr('data-index');
        $('.bg_step').eq(num).show().siblings('.bg_step').hide();
    });
    //下一步
    $('.next_1').click(function () {
        var num = $(this).attr('data-index');
        var time = $('#time').val();
        var country = $('#country').val();
        var major = $('#major').val();
        var gmat = $('#gmat').val();
        var toefl = $('#toefl').val();
        var ielts = $('#ielts').val();
        var yes02 = $('#point3');
        var work_exp = $('#work_exp').val();
        if (!time || !country || !major) {
            alert("请注意必填项！");
            return false;
        }
        if (yes02[0].checked) {
            if (!work_exp) {
                alert("请填写实习经历！");
                return false;
            }
        }
        $('.bg_step').eq(num).show().siblings('.bg_step').hide();

    });
    //提交
    $('.st_tj').click(function () {
        var time = $("#time").val();//出国时间
        var country = $("#country").val();//意向国家
        var major = $("#major").val();//意向专业
        var gmat = $('#gmat').val();
        var toefl = $('#toefl').val();
        var ielts = $('#ielts').val();
        var question = $(".check_box input:checked").length;//是否有关心的问题
        var work_exp = $('#work_exp').val();//工作经验
        var name = $("#n-name").val();//姓名
        var phone = $("#n-phone").val();//电话
        var reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        var weChat = $("#n-wechat").val();//微信
        var buchong = $("#buchong").val();//补充了解（非必填）
        var questionArray = [];//关心的问题;
        if(!time || !country || !major || !question || !name || !phone || !weChat){
            alert("请将必填项填写完整！");
            return false;
        }
        if(!reg.test(phone)){
            alert("电话格式不正确！");
            return false;
        }else {
                $(".check_box input:checked").each(function () {
                    questionArray.push($(this).val());
                });
            $.ajax({
                type:'post',
                url:httpUrl + '/cn/wap-api/background-result',
                data:{
                    planTime:time,
                    country:country,
                    major:major,
                    gmat:gmat,
                    toefl:toefl,
                    ielts:ielts,
                    experience:work_exp,
                    emphases:buchong,
                    uName:name,
                    phone:phone,
                    weChat:weChat
                },
                dataType:'json',
                success:function(data){
                    if(data.code=1){
                        $('.bg_step ').eq(2).fadeIn().siblings('.bg_step ').hide();
                    }else {
                        alert(data.message);
                    }
                }
            })
        }

    })


});
function radioChange(o){
    if (o.hasAttribute('rel')) {
        $(o).parents(".step_text_intra ").next('.step_int_wrap').slideDown();
    } else {
        $(o).parents(".step_text_intra ").next('.step_int_wrap').slideUp();
    }
}
