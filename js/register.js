var phoneReg=/((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
var emailReg=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;
//注册提交
function registerSub(){
    var username=$("#username").val();
    var phone=$("#phoneOrem").val();
    var password=$("#password").val();
    var code_yz=$("#yzm").val();
    var repass=$("#repass").val();
    var phoneCode=getCookie("phoneCode");
    var typeNum="";
    if(phoneReg.test(phone)){
         typeNum=1;
    }
    if(emailReg.test(phone)){
         typeNum=2;
    }
    if(repass!=password){
        alert("两次密码输入不一致，请重新输入！");
        return false;
    }else{
        if(username && phone && password && code_yz && repass){
            $.ajax({
                type : "post",
                url : "http://login.gmatonline.cn/cn/wap-api/register",
                dataType : "json",
                data:{
                    registerStr:phone,
                    type:typeNum,//1表示手机注册 2表示邮箱注册
                    phoneCode:phoneCode,
                    code:code_yz,
                    pass:password,
                    userName:username,
                    source:2//1是gmat 2是托福
                },
                //jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
                //jsonpCallback:"success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
                success : function(data){
                    alert(data.message);
                    if(data.code==1){
                        subLogin('#phoneOrem','#password');
                        delCookie("phoneCode");
                    }
                },
                error:function(){
                    alert('fail注册');
                }
            });
        }else{
            alert("请将信息填写完整！");
        }

    }

}
//找回密码提交
function foundCode(){
    var c_phone=$("#phoneOrem").val();
    var c_password=$("#c_password").val();
    var c_code_yz=$("#c_code").val();
    var c_repass=$("#c_repass").val();
    var c_phoneCode=getCookie("phoneCode");
    var type='';
    if(phoneReg.test(c_phone)){
        type=1;
    }
    if(emailReg.test(c_phone)){
        type=2;
    }
    if(c_repass!=c_password){
        alert("两次密码输入不一致，请重新输入！");
        return false;
    }
    if(c_phone && c_password && c_code_yz && c_repass &&c_phoneCode){
        $.ajax({
            type : "post",
            url : "http://login.gmatonline.cn/cn/wap-api/find-pass",
            dataType : "json",
            data:{
                registerStr:c_phone,
                type:type,//1手机
                phoneCode:c_phoneCode,
                code:c_code_yz,
                pass:c_password
            },
            //jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            //jsonpCallback:"success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            success : function(data){
                alert(data.message);
                if(data.code==1){
                    delCookie("phoneCode");
                    location.href="login.html";
                }
            },
            error:function(){
                alert('fail找回密码');
            }
        });
    }else{
        alert("请将信息填写完整！");
    }
}
//发送验证码
function clickDX(e,type,noreg) {
    var _that = $(e);
    var defalutVal=$(e).val();
    var timeNum=null;
    var peStr = $('#phoneOrem').val();
    if(peStr == ""){
        alert('请输入邮箱或者手机号!');
        return false;
    }
    if(!phoneReg.test(peStr) && !emailReg.test(peStr)){
        alert('请输入正确格式的邮箱或者手机号!');
        return false;
    }
    if(phoneReg.test(peStr)){//手机号
        timeNum=60;
        $.ajax({
            type : "post",
            url : "http://login.gmatonline.cn/cn/wap-api/phone-code",
            dataType : "json",
            data:{
                phoneNum:peStr,
                type:type
            },
            //jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            //jsonpCallback:"success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            success : function(data){
                if(noreg!=2){
                    alert(data.message);
                    if(data.message=="发送失败!手机号码为空！"){
                        return false;
                    }else if(data.message=="电话已注册"){
                        return false;
                    }
                }
                if(data.code==1){
                    setCookie("phoneCode",data.phonecode);

                }
                //$(e).removeAttr("onclick");
                $(e).attr("disabled", true);
                _that.unbind("click").val(timeNum + "秒后");
                var timer = setInterval(function () {
                    _that.val(timeNum + "秒后");
                    timeNum--;
                    if (timeNum < 0) {
                        clearInterval(timer);
                        $(e).removeAttr("disabled");
                        _that.val(defalutVal);

                    }
                }, 1000);

            },
            error:function(){
                alert('fail');
            }
        });
    }
    if(emailReg.test(peStr)){//邮箱
        timeNum=120;
        $.ajax({
            type : "post",
            url : "http://login.gmatonline.cn/cn/wap-api/send-mail",
            dataType : "json",
            data:{
                email:peStr,
                type:type
            },
            //jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            //jsonpCallback:"success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            success : function(data){
                alert(data.message);
                if(data.message=="发送失败!邮箱为空！"){
                    return false;
                }else{
                    setCookie("phoneCode",data.emailCode);
                    //$(e).removeAttr("onclick");
                    $(e).attr("disabled", true);
                    _that.unbind("click").val(timeNum + "秒后");
                    var timer = setInterval(function () {
                        _that.val(timeNum + "秒后");
                        timeNum--;
                        if (timeNum < 0) {
                            clearInterval(timer);
                            $(e).removeAttr("disabled");
                            _that.val(defalutVal);

                        }
                    }, 1000);
                }
            },
            error:function(){
                alert('fail');
            }
        });
    }
}