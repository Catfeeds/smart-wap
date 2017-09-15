$(function () {
    var Requests = GetRequests();
    var id = Requests['id'];
    var url_type = Requests['url_type'];
    var seeId = Requests['seeId'];
    var uid=localStorage.getItem('uid');
    // 返回按钮
    if (url_type==1){
        $(".return").click(function(){
            location.href='my_qa.html';
        })
    }else {
        $(".return").click(function(){
            location.href='qa_index.html';
        })
    }
    //        评论页面切换
    $(document).on('click','.en_reply',function () {
       if(!uid){
           var r = confirm("您还未登录，是否跳转到登录页！");
           if (r == true) {
               location.href = 'login.html';
           }
           else {
               return false;
           }
       }else {
           $('#userId').val($(this).attr('user-id'));
           $('#cur_id').val($(this).parents('li').attr('cur-id'));
           $('.invitation_model').addClass('on');
           $('#tw_index').addClass('on');
           $('.rp_tit').html('评论');
           $('#replyUsername').val($(this).parents('li').find(".answer_name").html());
           $('#reply_de').attr('placeholder','写下你的评论...').val('');
       }
    });
    // 点击回复
    $(document).on('click','.reply_user',function () {
        if(!uid){
            var r = confirm("您还未登录，是否跳转到登录页！");
            if (r == true) {
                location.href = 'login.html';
            }
            else {
                return false;
            }
        }else{
            $('#userId').val($(this).attr('user-id'));
            $('#cur_id').val($(this).parents('li').attr('cur-id'));
            $('.invitation_model').addClass('on');
            $('#tw_index').addClass('on');
            $('.rp_tit').html('回复');
            var replyUsername=$(this).find('.replyUsername').html();
            $('#replyUsername').val(replyUsername);
            $('#reply_de').attr('placeholder','回复 '+replyUsername+'：').val('');

        }

    });
    // 提交
    $('.save').click(function () {
        var id = $('#cur_id').val();
        var uid=localStorage.getItem('uid');
        var replyId=$('#userId').val();
        var replyName=$('#replyUsername').val();
        var contents=$('#reply_de').val();
        reply(uid,id,replyName,replyId,contents);
    });
    // 返回详情
    $(document).on('click','.yes_invit',function () {
        $('.invitation_model').removeClass('on');
        $('#tw_index').removeClass('on');
    });
    var myApp = angular.module("myApp", []);
    myApp.filter('nullImg', function ($sce) {
        return function (img) {
            if (img) {
                return httpUrl + img;
            } else {
                return 'images/default.png';
            }
        }
    });
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
            var regExp = new RegExp("files|/files", 'g');
            return $sce.trustAsHtml(content.replace(regExp, 'http://www.smartapply.cn/files'));
        }
    });
    //通过模块生成调用控制器
    myApp.controller("abroad_view", ["$scope", "$http", "$sce", function ($scope, $http, $sce) {
        $scope.toggle = {
            now: false
        };
        $scope.$watch('toggle.now', function () {
            if ($scope.toggle.now) {
                $('.dj_btn').click(function () {
                    var _this=$(this);
                    var contentId = $(this).attr('tent-id');
                    var num = parseInt($(this).find('.dj_num').html());
                    var num_text=$(this).find('.dj_num');
                    var dj_icon=$(this).find('.rep_icon');
                    if (!uid) {
                        var r = confirm("您还未登录，是否跳转到登录页！");
                        if (r == true) {
                            location.href = 'login.html';
                        }
                        else {
                            return false;
                        }
                    } else {
                        if (_this.hasClass('on')) {
                            $.ajax({
                                type: 'post',
                                url: httpUrl + '/cn/wap-api/cancel-fabulous',
                                data: {
                                    uid: uid,
                                    contentId: contentId,
                                },
                                dataType: 'json',
                                success: function (data) {
                                    if(data.code==2){
                                        _this.removeClass('on');
                                        dj_icon.attr('src', 'images/icon_dj.png');
                                    }
                                    if(data.code==1){
                                        num_text.html(num - 1);
                                        _this.removeClass('on');
                                        dj_icon.attr('src', 'images/icon_dj.png');
                                    }
                                    // alert(data.message);

                                }
                            });

                        } else {
                            $.ajax({
                                type: 'post',
                                url: httpUrl + '/cn/wap-api/spot-fabulous',
                                data: {
                                    uid: uid,
                                    contentId: contentId,
                                },
                                dataType: 'json',
                                success: function (data) {
                                    if(data.code==2){
                                        dj_icon.attr('src', 'images/dj2_icon.png');
                                        _this.addClass('on');
                                    }
                                    if(data.code==1){
                                        num_text.html(num + 1);
                                        dj_icon.attr('src', 'images/dj2_icon.png');
                                        _this.addClass('on');
                                    }
                                    // alert(data.message);

                                }
                            });
                        }
                        $(this).find('.dj_num').toggleClass('on');
                    }


                });
            }
        });
        $http({
            method: 'post',
            url: httpUrl + '/cn/wap-api/question-detail',
            data: {
                uid:uid,
                seeId:seeId,
                questionId: id
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function (data) {
            $scope.http = httpUrl;
            $scope.http2 = httpUrl2;
            $scope.question = data.question;
            $scope.answer = data.answer;
        });
    }]);
});
function reply(uid,id,replyName,replyId,contents) {
    $.ajax({
        type: 'post',
        url: httpUrl + '/cn/wap-api/sub-answer',
        data: {
            uid: uid,
            type:3,
            replyUser:replyName,
            replyUid:replyId,
            questionId:id,
            contents: contents
        },
        dataType: 'json',
        success: function (data) {
            if (data.code==1){
                location.reload();
            }else {
                alert('提交失败');
                return false;
            }
        }
    })
}
