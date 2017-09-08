$(function () {
    var Requests = GetRequests();
    var uid=localStorage.getItem('uid');
    var myApp = angular.module("myApp", []);
    //        页面切换
    $('.sel_teacher').click(function (e) {
        $('.invitation_model').addClass('on');
        $('#tw_index').addClass('on');

    });
    $('.yes_invit').click(function () {
        var teachArray=[];
        var str='';
        $('.invitation_model').removeClass('on');
        $('#tw_index').removeClass('on');
        $(".inputCheck").each(function (i) {
            var teachName=$(this).parents('li').find('.inviter_name ').html();
            if($(this).is(':checked')){
                str+='<span class="teacher_name fl">'+teachName+'</span>';
                teachArray.push($(this).attr('check-id'));
            }
        });
        $('.sel_wrap .teacher_name').remove();
        $('.yq_name').after(str);

    });
//        选择标签
    $(document).on('click','.tag_sel li',function () {
        if ($(this).hasClass('on')) {
            $(this).removeClass('on')
        } else {
            $(this).addClass('on')
        }
    });
    //        提交问题
    $('.save').click(function () {
        var tag = [];
        var adviserId=[];
        var qustion=$('#question_tit').val();
        var contents=$('#question_de').val();
        $('.tag_sel li.on').each(function (i,j) {
            tag.push( $(this).attr('tag-id'));
        });
        $(".inputCheck").each(function (i) {
            if($(this).is(':checked')){
                adviserId.push($(this).attr('check-id'));
            }
        });
        if(!qustion){
            alert('请注意必填项！');
            return false;
        }else {
            $.ajax({
                type: 'post',
                url: httpUrl + '/cn/wap-api/sub-question',
                data: {
                    uid: uid,
                    tag:tag,
                    adviserId:adviserId,
                    question:qustion,
                    contents: contents
                },
                dataType: 'json',
                success: function (data) {
                    alert(data.message);
                    if (data.code==1){
                        location.href='qa_index.html';
                    }
                }
            });
        }

    });
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
    myApp.controller("abroad_view", ["$scope", "$http", "$sce", function ($scope, $http, $sce) {
        // $scope.toggle = {
        //     now:false
        // };
        // $scope.$watch('toggle.now',function(){
        //     if($scope.toggle.now){
        //
        //     }
        // });
        $http({
            method: 'post',
            url: httpUrl + '/cn/wap-api/put-questions',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function (data) {
            $scope.http = httpUrl;
            $scope.http2 = httpUrl2;
            $scope.data = data;
        });
    }]);

});