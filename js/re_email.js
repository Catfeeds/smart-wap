/**
 * Created by Administrator on 2017/8/25.
 */
var regexp=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
$(function(){
    var userInfo = $.parseJSON(localStorage.getItem('userInfo'));
    $('.userInfo_response').html(userInfo.email);
    //获取验证码
        $('#code_btn').click(function(){
            var email=$('#old_pwd').val();
            var timeNum=60;
            var _that=$(this);
            var defalutVal=$(this).val();
            if(!regexp.test(email)){
                alert("请输入正确的邮箱格式");
                return false;
            }else {
                $.ajax({
                    type:'post',
                    url:httpUrl + '/cn/api/send-mail',
                    data:{
                        email:email
                    },
                    dataType:'json',
                    success:function(data){
                        $(this).attr("disabled", true);
                        _that.unbind("click").val(timeNum + "秒后");
                        var timer = setInterval(function () {
                            _that.val(timeNum + "秒后");
                            timeNum--;
                            if (timeNum < 0) {
                                clearInterval(timer);
                                $(this).removeAttr("disabled");
                                _that.val(defalutVal);
                            }
                        }, 1000);
                    }
                })
            }

        });
    //13541180269@gmatonline.com
    //提交保存
    $('.save').click(function(){
        var code=$('.code_val').val();
        var email=$('#old_pwd').val();
        if(!regexp.test(email)){
            alert("请输入正确的邮箱格式");
            return false;
        }else {
            $.ajax({
                type:'post',
                url:httpUrl + '/cn/wap-api/change-user-email',
                data:{
                    uid:userInfo.email,
                    emailCode:code,
                    email:email
                },
                dataType:'json',
                success:function(data){
                    alert(data.message)
                }
            })
        }
    })

});