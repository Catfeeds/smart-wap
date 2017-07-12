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
            url: 'http://test.school.gmatonline.cn/cn/wap-api/school-detail',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                schoolId: id
            }
        }).success(function (data) {
            $scope.http = httpUrl;
            $scope.http2 = httpUrl2;
            $scope.data = data.data;
            $scope.reply = data.reply;
            $scope.hot = data.hot;
            $scope.major=data.major;
        });

    }]);
});
function subComment(o, username) {
    var type = $(o).attr("data-type");
    var pid = $(o).attr("data-pid");
    var contentId= $(o).attr("data-content");
    var replyUser = $(o).attr("data-replyUser");
    var val = $("#lastText").val();
    var currentT = currentTime();
    var btn = $("#subBtn");
    var uid=sessionStorage.getItem('uid');
    if (!val) {
        alert("请输入你的评论内容！");
        return false;
    }
    if (!replyUser) {
        var r = confirm("您还未登录，是否跳转到登录页！");
        if (r == true) {
            location.href = 'login.html';
        }
        else {
            return false;
        }

    }
    $.post("http://test.school.gmatonline.cn/cn/api/add-reply",{uid:uid,pid:pid,replyUser:replyUser,content:val,contentId:contentId},function(re){
//        alert(re.message);
//        if(re.code == 1){
    if (type == 1) {//一级回复
        var str = '';
        str = '<li>' +
            '<div class="comment-left">' +
            '<div class="comment-thumb">' +
            '<img src="images/an-img/question-3.png" alt="用户头像"/>' +
            '</div>' +
            '<p>Anne</p>' +
            '</div>' +
            '<div class="comment-right">' +
            ' <ul>' +
            '<li>' +
            '<div class="c-top">' + val +
            ' </div>' +
            ' <div class="c-bot">' +
            '<span>' + currentT + '</span>' +
            '<img src="images/an-img/school-commet.png" alt="评论图标" onclick="secondReply(this)"/>' +
            '</div>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '<div class="clearfix"></div>' +
            '<div class="moreReply" onclick="seeMoreRe(this)">' +
            '查看<span class="blue">teacher</span>等回复' +
            ' </div>' +
            '</li>';
        $(".comment-show>ul").append(str);
    } else if (type == 2) {
        var user = btn.attr("data-user");
        var index = btn.attr("data-num");
        var str02 = '';
        str02 = '<li>' +
            '<div class="c-top">' +
            '<span class="blue">Anne</span>回复<span class="blue">' + user + '</span>：' + val +
            '</div>' +
            '<div class="c-bot">' +
            '<span>' + currentT + '</span>' +
            '<img src="images/an-img/school-commet.png" alt="评论图标" onclick="threeReply(this)"/>' +
            '</div>' +
            '</li>';
        $(".comment-show>ul>li").eq(index).find(".comment-right>ul").append(str02);
    } else if (type == 3) {
        var user03 = btn.attr("data-user");
        var index03 = btn.attr("data-num");
        var str03 = '';
        str03 = '<li>' +
            '<div class="c-top">' +
            '<span class="blue">Anne</span>回复<span class="blue">' + user03 + '</span>：' + val +
            '</div>' +
            '<div class="c-bot">' +
            '<span>' + currentT + '</span>' +
            '<img src="images/an-img/school-commet.png" alt="评论图标" onclick="threeReply(this)"/>' +
            '</div>' +
            '</li>';
        $(".comment-show>ul>li").eq(index03).find(".comment-right>ul").append(str03);
    }
//        }
    },'json');
//    查看更多回复
    $(".comment-show>ul>li").each(function () {
        var _that = $(this);
        if (_that.find(".comment-right>ul>li").length > 4) {
            _that.find(".moreReply").show();
            _that.find(".comment-right>ul>li").each(function () {
                if ($(this).index() > 3) {
                    $(this).hide();
                }
            });
        }
    });
//    清空文本域值
    $("#lastText").val("");
}
//获取当前时间点
function currentTime() {
    var oDate = new Date(); //实例一个时间对象；
//    oDate.getFullYear();   //获取系统的年；
//    oDate.getMonth()+1;   //获取系统月份，由于月份是从0开始计算，所以要加1
//    oDate.getDate(); // 获取系统日，
//    oDate.getHours(); //获取系统时，
//    oDate.getMinutes(); //分
//    oDate.getSeconds(); //秒
    var h = '';
    var m = '';
    var hour = oDate.getHours();
    var min = oDate.getMinutes();
    if (hour < 10) {
        h = "0" + hour;
    } else {
        h = hour;
    }
    if (min < 10) {
        m = "0" + min;
    } else {
        m = min;
    }
    var str = "" + oDate.getFullYear() + ".";
    str += (oDate.getMonth() + 1) + ".";
    str += oDate.getDate() + " ";
    str += h + ":";
    str += m + "";
    return str;
}
//一级回复
function bigReply(o, replyUser, pid) {
    var btn = $("#subBtn");
    btn.attr("data-type", 1);
    btn.attr("data-replyUser", replyUser);
    btn.attr("data-pid", pid);
    $("#lastText").attr("placeholder", "发表你的评论...").val("");
}
//二级回复
function secondReply(o, replyUser, pid) {
    var num = $(o).parents(".comment-right").parents("li").index();
    var username = $(o).parents(".comment-right").siblings(".comment-left").find("p").html();
    var btn = $("#subBtn");
    btn.attr("data-type", 2);
    btn.attr("data-num", num);
    btn.attr("data-user", username);
    btn.attr("data-replyUser", replyUser);
    btn.attr("data-pid", pid);
    $("#lastText").attr("placeholder", "@" + username).val("");
}
//三级回复
function threeReply(o, replyUser, pid) {
    var num = $(o).parents(".comment-right").parents("li").index();
    var username = $(o).parents(".c-bot").siblings(".c-top").find("span.blue").first().html();
    var btn = $("#subBtn");
    btn.attr("data-type", 3);
    btn.attr("data-num", num);
    btn.attr("data-user", username);
    btn.attr("data-replyUser", replyUser);
    btn.attr("data-pid", pid);
    $("#lastText").attr("placeholder", "@" + username).val("");
}
//查看更多回复
function seeMoreRe(o) {
    $(o).parents("li").find(".comment-right>ul>li").each(function () {
        if ($(this).index() > 3) {
            $(this).show();
            $(o).hide();
        }
    });
}