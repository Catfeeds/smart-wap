$(function(){

});
//注册倒计时函数
function clickDX(e, timeN, type,noreg) {
    var _that = $(e);
    var defalutVal=$(e).val();
    var timeNum = timeN;//倒计时时间
    var regOrfound=null;
    if(type==1){
        //var phone=$("#phone").val();
        //区分是注册的手机号还是找回密码的手机号
        var phone=$(e).parent().siblings().find("input").val();
        var phoneStr=$(e).parent().siblings().find("input").next(".Validform_right").html();
        if(!phone){
            alert("请输入手机号！");
            return false;
        }
        if(phoneStr=="通过信息验证！"){
            if(noreg){//找回密码
                regOrfound=noreg;
            }else{//注册
                regOrfound=type;
            }
            $.ajax({
                type : "post",
                url : "http://login.gmatonline.cn/cn/wap-api/phone-code",
                dataType : "json",
                data:{
                    phoneNum:phone,
                    type:regOrfound
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
    }else{
        //var phone=$("#phone").val();
        //区分是注册的手机号还是找回密码的手机号
        var email=$(e).parent().siblings().find("input").val();
        var emailStr=$(e).parent().siblings().find("input").next(".Validform_right").html();
        if(!email){
            alert("请输入邮箱！");
            return false;
        }
        if(emailStr=="通过信息验证！"){
            $.ajax({
                type : "post",
                url : "http://login.gmatonline.cn/cn/wap-api/send-mail",
                dataType : "json",
                data:{
                    email:email,
                    type:type
                },
                //jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
                //jsonpCallback:"success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
                success : function(data){
                    alert(data.message);
                    if(data.message=="发送失败!邮箱为空！"){
                        return false;
                    }else{
                        setCookie("emailCode",data.code);
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

    }


/**
 * 获取a标签传递到新页面的参数
 * @returns {Object}
 * @constructor
 */
function GetRequests(){
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
            //theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

/**
 *将秒转换为 hh:mm:ss
 *
 */
function time_To_hhmmss(seconds){
    var hh;
    var mm;
    var ss;
    //传入的时间为空或小于0
    if(seconds==null||seconds<0){
        return;
    }
    //得到小时
    hh=seconds/3600|0;
    seconds=parseInt(seconds)-hh*3600;
    if(parseInt(hh)<10){
        hh="0"+hh;
    }
    //得到分
    mm=seconds/60|0;
    //得到秒
    ss=parseInt(seconds)-mm*60;
    if(parseInt(mm)<10){
        mm="0"+mm;
    }
    if(ss<10){
        ss="0"+ss;
    }
    if(hh!=0){
        return hh+"h"+mm+"m"+ss+"s";
    }else if(mm!=0){
        return parseInt(mm)+"m"+ss+"s";
    }else if(ss!=0){
        return parseInt(ss)+"s";
    }

}

//转意符换成普通字符
function escape2Html(str) {
    var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
}

//写cookies
function setCookie(objName, objValue, objHours){//添加cookie
    var str = objName + "=" + escape(objValue);
    if (objHours > 0) {//为0时不设定过期时间，浏览器关闭时cookie自动消失
        var date = new Date();
        var ms = objHours * 3600 * 1000;
        date.setTime(date.getTime() + ms);
        str += "; expires=" + date.toGMTString();
    }
    document.cookie = str;
}
//读取cookies
function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

    if(arr=document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}

//删除cookies
function delCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
//登录

function subLogin(name,pass){
    var username=$(name).val();
    var password=$(pass).val();
    $.ajax({
        type : "post",
        url : "http://login.gmatonline.cn/cn/wap-api/check-login?userName="+username+"&userPass="+password,
        dataType : "jsonp",
        jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonpCallback:"success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        success : function(data){
            if(data.code==1){
                setCookie('userCode',data.code);
                setCookie('userName',data.username);
                setCookie('uid',data.uid);
                localStorage.setItem('nickname',data.nickname);
                localStorage.setItem('userName',data.username);
                localStorage.setItem('uid',data.uid);
                //托福
                $.ajax({
                    type : "post",
                    url : "http://www.toeflonline.cn/cn/wap-api/unify-login?uid="+data.uid+"&username="+data.username+"&password="+data.password
                    +"&email="+data.email+"&phone="+data.phone,
                    dataType : "jsonp",
                    jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
                    jsonpCallback:"success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
                    success:function(data01){
                        setCookie('userId',data01.userId);
                        //留学
                        $.ajax({
                            type : "post",
                            url : "http://www.smartapply.cn/cn/wap-api/unify-login?uid="+data.uid+"&username="+data.username+"&password="+data.password
                            +"&email="+data.email+"&phone="+data.phone,
                            dataType : "jsonp",
                            jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
                            jsonpCallback:"success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
                            success:function(data02){
                                setCookie('s_userId',data02.userId);
                                //gmat
                                $.ajax({
                                    type : "post",
                                    url : "http://www.gmatonline.cn/index.php?web/webapi/unifyLogin&uid="+data.uid+"&username="+data.username+"&password="+data.password
                                    +"&email="+data.email+"&phone="+data.phone,
                                    dataType : "jsonp",
                                    jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
                                    jsonpCallback:"success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
                                    success:function(){
                                        //bbs
                                        $.ajax({
                                            type : "post",
                                            url : "http://bbs.gmatonline.cn/api/gmat.php?action=unifyLogin&uid="+data.uid,
                                            dataType : "jsonp",
                                            jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
                                            jsonpCallback:"success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
                                            success:function(){
                                                //setCookie('smartSid',data.sid);
                                            },error:function(){
                                                //alert("bbsfail");
                                            }
                                        });
                                    } ,error:function(){
                                        //alert("gmatfail");
                                    }
                                });
                            },
                            error:function(){
                                alert("smartfail");
                            }
                        });
                    },
                    error:function(){
                        alert("toeflfail");
                    }
                });

                setTimeout(function(){
                    location.href="index.html";
                },1500);
            }else{
                alert(data.message);
            }
        },
        error:function(){
            alert('fail');
        }
    });
}
//用户中心图标判断是否登录
function personLogin(){
    var cookie_val = getCookie("userCode");
    if(cookie_val){
        location.href="personCenter.html";
    }else{
        location.href="login.html";
    }
}