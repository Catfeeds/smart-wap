$(function () {
    var Requests = GetRequests();
    $(".dropdown-menu").css("minWidth", $(".btn-group").width() + "px");
    $(".left-mask").css("left", "-" + $(".left-mask").width() / 1.1 + "px");
    $("#stopUp").on("click", "[data-stopPropagation]", function (e) {
        e.stopPropagation();
    });
    //下拉选择
    $(document).on('click', '.left-mask ul li', function () {
        var htmls = $(this).html();
        var that_mId = $(this).attr("data-mid");
        $(this).parents(".dropdown-menu").siblings("button").find("b").html(htmls).attr('data-demId', that_mId);
        var countryId = $('.decId').attr('data-decId');
        var rankId = $('.derId').attr('data-derId');
        var majorId = $('.demId').attr('data-demId');
        console.log(countryId, rankId, majorId);
        $.ajax({
            url: 'http://test.school.gmatonline.cn/cn/wap-api/ajax-school',
            type: 'get',
            data: {
                country: countryId,
                major: majorId,
                rank: rankId,
            },
            dataType: 'json',
            success: function (data) {
                var str = '<ul>';
                if (data.data == '') {
                    alert('暂无当前数据!')
                } else {
                    alert('当前数据获取成功!');
                    location.href='#list';
                    $('.schoolList ul.data_list').empty();
                    $(data.data).each(function (a, b) {
                        str += '<li ng-repeat="data in data.data">' +
                            '<div class="list-left">' +
                            '<h4><a href="school-detail.html?id='+ b.id+'">' + b.name + '</a></h4>' +
                            '<p class="ellipsis">' + b.title + '</p>' +
                            '<p class="ellipsis">所在地：' + b.place + '</p>' +
                            '<p class="ellipsis">地理位置：' + b.seat + '</p>' +
                            '<p class="ellipsis">官网：<a href="' + b.listeningFile + '">' + b.listeningFile + '</a></p>' +
                            '<p class="blue ellipsis">专业项目：Management</p>';
                        if (b.major == '') {
                            str+='<p class="ellipsis">学位：专业类别：';
                        } else {
                            str+='<p class="ellipsis">学位：' + b.major[0].degree + '专业类别：' + b.major[0].name + '</p>';
                        }
                        str+='<p class="ellipsis">学校排名：' + b.rank + '</p>' +
                        '</div>' +
                        '<div class="list-right">' +
                        '<div class="list-thumb">' +
                        '<a href="school-detail.html?id='+ b.id+'">' +
                        '<img src="http://schools.smartapply.cn' + b.image + '" alt="学校图片"/>' +
                        '</a>' +
                        '</div>' +
                        '<p class="ellipsis">已有' + b.viewCount + '人关注</p>' +
                        '</div>' +
                        '<div class="clearfix"></div>' +
                        '<div class="bot-btn">' +
                        '<a href="mqqwpa://im/chat?chat_type=wpa&uin=2949709934&version=1&src_type=web&web_src=http://m.haishiit.com/">和顾问聊聊</a>' +
                        '<a href="mqqwpa://im/chat?chat_type=wpa&uin=2949709934&version=1&src_type=web&web_src=http://m.haishiit.com/">学校录取测评</a>' +
                        '</div>' +
                        '</li>';
                    });
                    str += '</ul>';
                    $('.schoolList ul.data_list').append(str);
                }
                if(data.pageStr==''){
                    $('.pageSize').empty();
                }else {
                    $('.pageSize').empty();
                    $('.pageSize').append(data.pageStr);
                }
            }
        })
    });
    //分页数据请求
    $(document).on("click",".iPage",function(){
        $(this).addClass("on").siblings("li").removeClass("on");
        var major_val=localStorage.getItem('major_val');
        var school_val=localStorage.getItem('school_val');
        var page=$(this).html();
        $.ajax({
            url: 'http://test.school.gmatonline.cn/cn/wap-api/wap-select',
            type: 'get',
            data: {
                school: school_val,
                majors: major_val,
                page: page,
            },
            dataType: 'json',
            success: function (data) {
                var str = '<ul>';
                if (data.data == '') {
                    alert('暂无当前数据!')
                } else {
                    location.href='#list';
                    $('.schoolList ul.data_list').empty();
                    $(data.data).each(function (a, b) {
                        str += '<li ng-repeat="data in data.data">' +
                            '<div class="list-left">' +
                            '<h4><a href="school-detail.html?id='+ b.id+'">' + b.name + '</a></h4>' +
                            '<p class="ellipsis">' + b.title + '</p>' +
                            '<p class="ellipsis">所在地：' + b.place + '</p>' +
                            '<p class="ellipsis">地理位置：' + b.seat + '</p>' +
                            '<p class="ellipsis">官网：<a href="' + b.listeningFile + '">' + b.listeningFile + '</a></p>' +
                            '<p class="blue ellipsis">专业项目：Management</p>';
                        if (b.major == '') {
                            str+='<p class="ellipsis">学位：专业类别：';
                        } else {
                            str+='<p class="ellipsis">学位：' + b.major[0].degree + '专业类别：' + b.major[0].name + '</p>';
                        }
                        str+='<p class="ellipsis">学校排名：' + b.rank + '</p>' +
                            '</div>' +
                            '<div class="list-right">' +
                            '<div class="list-thumb">' +
                            '<a href="school-detail.html?id='+ b.id+'">' +
                            '<img src="http://schools.smartapply.cn' + b.image + '" alt="学校图片"/>' +
                            '</a>' +
                            '</div>' +
                            '<p class="ellipsis">已有' + b.viewCount + '人关注</p>' +
                            '</div>' +
                            '<div class="clearfix"></div>' +
                            '<div class="bot-btn">' +
                            '<a href="mqqwpa://im/chat?chat_type=wpa&uin=1746295647&version=1&src_type=web&web_src=http://m.haishiit.com/">和顾问聊聊</a>' +
                            '<a href="mqqwpa://im/chat?chat_type=wpa&uin=2949709934&version=1&src_type=web&web_src=http://m.haishiit.com/">学校录取测评</a>' +
                            '</div>' +
                            '</li>';
                    });
                    str += '</ul>';
                    $('.schoolList ul.data_list').append(str);
                }
                if(data.pageStr==''){
                    $('.pageSize').empty();
                }else {
                    $('.pageSize').empty();
                    $('.pageSize').append(data.pageStr);
                }
            }
        })
    });
    $(document).on("click",".prev",function(){
        var pageNum=$('.pageSize li.on').html();
        var major_val=localStorage.getItem('major_val');
        var school_val=localStorage.getItem('school_val');
        if(pageNum==1){
            return false
        }else {
            $('.pageSize li.on').removeClass("on").prev().addClass("on");
            var page=parseInt(pageNum)-1;
        }
        $.ajax({
            url: 'http://test.school.gmatonline.cn/cn/wap-api/wap-select',
            type: 'get',
            data: {
                school: school_val,
                majors: major_val,
                page: page,
            },
            dataType: 'json',
            success: function (data) {
                var str = '<ul>';
                if (data.data == '') {
                    alert('暂无当前数据!')
                } else {
                    location.href='#list';
                    $('.schoolList ul.data_list').empty();
                    $(data.data).each(function (a, b) {
                        str += '<li ng-repeat="data in data.data">' +
                            '<div class="list-left">' +
                            '<h4><a href="school-detail.html?id='+ b.id+'">' + b.name + '</a></h4>' +
                            '<p class="ellipsis">' + b.title + '</p>' +
                            '<p class="ellipsis">所在地：' + b.place + '</p>' +
                            '<p class="ellipsis">地理位置：' + b.seat + '</p>' +
                            '<p class="ellipsis">官网：<a href="' + b.listeningFile + '">' + b.listeningFile + '</a></p>' +
                            '<p class="blue ellipsis">专业项目：Management</p>';
                        if (b.major == '') {
                            str+='<p class="ellipsis">学位：专业类别：';
                        } else {
                            str+='<p class="ellipsis">学位：' + b.major[0].degree + '专业类别：' + b.major[0].name + '</p>';
                        }
                        str+='<p class="ellipsis">学校排名：' + b.rank + '</p>' +
                            '</div>' +
                            '<div class="list-right">' +
                            '<div class="list-thumb">' +
                            '<a href="school-detail.html?id='+ b.id+'">' +
                            '<img src="http://schools.smartapply.cn' + b.image + '" alt="学校图片"/>' +
                            '</a>' +
                            '</div>' +
                            '<p class="ellipsis">已有' + b.viewCount + '人关注</p>' +
                            '</div>' +
                            '<div class="clearfix"></div>' +
                            '<div class="bot-btn">' +
                            '<a href="mqqwpa://im/chat?chat_type=wpa&uin=1746295647&version=1&src_type=web&web_src=http://m.haishiit.com/">和顾问聊聊</a>' +
                            '<a href="mqqwpa://im/chat?chat_type=wpa&uin=2949709934&version=1&src_type=web&web_src=http://m.haishiit.com/">学校录取测评</a>' +
                            '</div>' +
                            '</li>';
                    });
                    str += '</ul>';
                    $('.schoolList ul.data_list').append(str);
                }
                if(data.pageStr==''){
                    $('.pageSize').empty();
                }else {
                    $('.pageSize').empty();
                    $('.pageSize').append(data.pageStr);
                }
            }
        })
    });
    $(document).on("click",".next",function(){
        var major_val=localStorage.getItem('major_val');
        var school_val=localStorage.getItem('school_val');
        var pageNum=$('.pageSize li.on').html();
        if(pageNum==3){
            return false
        }else {
            $('.pageSize li.on').removeClass("on").next().addClass("on");
            var page=parseInt(pageNum)+1;
        }
        $.ajax({
            url: 'http://test.school.gmatonline.cn/cn/wap-api/wap-select',
            type: 'get',
            data: {
                school: school_val,
                majors: major_val,
                page: page,
            },
            dataType: 'json',
            success: function (data) {
                var str = '<ul>';
                if (data.data == '') {
                    alert('暂无当前数据!')
                } else {
                    location.href='#list';
                    $('.schoolList ul.data_list').empty();
                    $(data.data).each(function (a, b) {
                        str += '<li ng-repeat="data in data.data">' +
                            '<div class="list-left">' +
                            '<h4><a href="school-detail.html?id='+ b.id+'">' + b.name + '</a></h4>' +
                            '<p class="ellipsis">' + b.title + '</p>' +
                            '<p class="ellipsis">所在地：' + b.place + '</p>' +
                            '<p class="ellipsis">地理位置：' + b.seat + '</p>' +
                            '<p class="ellipsis">官网：<a href="' + b.listeningFile + '">' + b.listeningFile + '</a></p>' +
                            '<p class="blue ellipsis">专业项目：Management</p>';
                        if (b.major == '') {
                            str+='<p class="ellipsis">学位：专业类别：';
                        } else {
                            str+='<p class="ellipsis">学位：' + b.major[0].degree + '专业类别：' + b.major[0].name + '</p>';
                        }
                        str+='<p class="ellipsis">学校排名：' + b.rank + '</p>' +
                            '</div>' +
                            '<div class="list-right">' +
                            '<div class="list-thumb">' +
                            '<a href="school-detail.html?id='+ b.id+'">' +
                            '<img src="http://schools.smartapply.cn' + b.image + '" alt="学校图片"/>' +
                            '</a>' +
                            '</div>' +
                            '<p class="ellipsis">已有' + b.viewCount + '人关注</p>' +
                            '</div>' +
                            '<div class="clearfix"></div>' +
                            '<div class="bot-btn">' +
                            '<a href="mqqwpa://im/chat?chat_type=wpa&uin=1746295647&version=1&src_type=web&web_src=http://m.haishiit.com/">和顾问聊聊</a>' +
                            '<a href="mqqwpa://im/chat?chat_type=wpa&uin=2949709934&version=1&src_type=web&web_src=http://m.haishiit.com/">学校录取测评</a>' +
                            '</div>' +
                            '</li>';
                    });
                    str += '</ul>';
                    $('.schoolList ul.data_list').append(str);
                }
                if(data.pageStr==''){
                    $('.pageSize').empty();
                }else {
                    $('.pageSize').empty();
                    $('.pageSize').append(data.pageStr);
                }
            }
        })
    });
   //搜索
    $('.searchBtn').click(function(){
        var major_val=$('#major').val();
        var school_val=$('#school').val();
        $.ajax({
            url: 'http://test.school.gmatonline.cn/cn/wap-api/wap-select',
            type: 'get',
            data: {
                school: school_val,
                majors: major_val,
                page: 1,
            },
            dataType: 'json',
            success: function (data) {
                var str = '<ul>';
                if (data.data == '') {
                    alert('暂无当前数据!')
                } else {
                    alert('当前数据获取成功!');
                    location.href='#list';
                    localStorage.setItem('major_val',major_val);
                    localStorage.setItem('school_val',school_val);
                    $('.schoolList ul.data_list').empty();
                    $(data.data).each(function (a, b) {
                        str += '<li ng-repeat="data in data.data">' +
                            '<div class="list-left">' +
                            '<h4><a href="school-detail.html?id='+ b.id+'">' + b.name + '</a></h4>' +
                            '<p class="ellipsis">' + b.title + '</p>' +
                            '<p class="ellipsis">所在地：' + b.place + '</p>' +
                            '<p class="ellipsis">地理位置：' + b.seat + '</p>' +
                            '<p class="ellipsis">官网：<a href="' + b.listeningFile + '">' + b.listeningFile + '</a></p>' +
                            '<p class="blue ellipsis">专业项目：Management</p>';
                        if (b.major == '') {
                            str+='<p class="ellipsis">学位：专业类别：';
                        } else {
                            str+='<p class="ellipsis">学位：' + b.major[0].degree + '专业类别：' + b.major[0].name + '</p>';
                        }
                        str+='<p class="ellipsis">学校排名：' + b.rank + '</p>' +
                            '</div>' +
                            '<div class="list-right">' +
                            '<div class="list-thumb">' +
                            '<a href="school-detail.html?id='+ b.id+'">' +
                            '<img src="http://schools.smartapply.cn' + b.image + '" alt="学校图片"/>' +
                            '</a>' +
                            '</div>' +
                            '<p class="ellipsis">已有' + b.viewCount + '人关注</p>' +
                            '</div>' +
                            '<div class="clearfix"></div>' +
                            '<div class="bot-btn">' +
                            '<a href="mqqwpa://im/chat?chat_type=wpa&uin=1746295647&version=1&src_type=web&web_src=http://m.haishiit.com/">和顾问聊聊</a>' +
                            '<a href="mqqwpa://im/chat?chat_type=wpa&uin=2949709934&version=1&src_type=web&web_src=http://m.haishiit.com/">学校录取测评</a>' +
                            '</div>' +
                            '</li>';
                    });
                    str += '</ul>';
                    $('.schoolList ul.data_list').append(str);
                }
                if(data.pageStr==''){
                    $('.pageSize').empty();
                }else {
                    $('.pageSize').empty();
                    $('.pageSize').append(data.pageStr);
                }
            }
        })
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
    myApp.filter('viewCount', function ($sce) {
        return function (count) {
            if(count==0){
                return Math.ceil(Math.random()*10000);
            }
            else {

                return count;
            }

        }
    });
    //通过模块生成调用控制器
    myApp.controller("abroad_view", ["$scope", "$http", "$sce", function ($scope, $http, $sce) {
        $http({
            method: 'post',
            url: 'http://test.school.gmatonline.cn/cn/wap-api/home-page',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                page: 1,
                country: "155",
                rank: "163",
                major: '196'
            }
        }).success(function (data) {
            $scope.http = httpUrl;
            $scope.http2 = httpUrl2;
            $scope.banner = data.banner;
            $scope.hot = data.hot;
            $scope.data = data.data;
            $scope.country = data.country;
            $scope.rank = data.rank;
            $scope.major = data.major;
        });

    }]);

});

function selectVal(o) {
    var htmls = $(o).find("a").html();
    //var that_cId=$(this).attr("data-cid");
    //var that_rId=$(this).attr("data-rid");
    $(o).addClass("on").siblings().removeClass("on");
    $(o).parent().siblings("button").find("b").html(htmls);
    if ($(o).attr('data-cid') != undefined) {
        $('.decId').attr('data-decId', $(o).attr('data-cid'))
    }
    if ($(o).attr('data-rid') != undefined) {
        $('.derId').attr('data-derId', $(o).attr('data-rid'))
    }
    var countryId = $('.decId').attr('data-decId');
    var rankId = $('.derId').attr('data-derId');
    var majorId = $('.demId').attr('data-demId');
    $.ajax({
        url: 'http://test.school.gmatonline.cn/cn/wap-api/ajax-school',
        type: 'get',
        data: {
            country: countryId,
            major: majorId,
            rank: rankId,
        },
        dataType: 'json',
        success: function (data) {
            var str = '<ul>';
            if (data.data == '') {
                alert('暂无当前数据!')
            } else {
                alert('当前数据获取成功!');
                location.href='#list';
                $('.schoolList ul.data_list').empty();
                $(data.data).each(function (a, b) {
                    str += '<li ng-repeat="data in data.data">' +
                        '<div class="list-left">' +
                        '<h4><a href="school-detail.html?id='+ b.id+'">' + b.name + '</a></h4>' +
                        '<p class="ellipsis">' + b.title + '</p>' +
                        '<p class="ellipsis">所在地：' + b.place + '</p>' +
                        '<p class="ellipsis">地理位置：' + b.seat + '</p>' +
                        '<p class="ellipsis">官网：<a href="' + b.listeningFile + '">' + b.listeningFile + '</a></p>' +
                        '<p class="blue ellipsis">专业项目：Management</p>';
                    if (b.major == '') {
                        str+='<p class="ellipsis">学位：专业类别：';
                    } else {
                        str+='<p class="ellipsis">学位：' + b.major[0].degree + '专业类别：' + b.major[0].name + '</p>';
                    }
                    str+='<p class="ellipsis">学校排名：' + b.rank + '</p>' +
                        '</div>' +
                        '<div class="list-right">' +
                        '<div class="list-thumb">' +
                        '<a href="school-detail.html?id='+ b.id+'">' +
                        '<img src="http://schools.smartapply.cn' + b.image + '" alt="学校图片"/>' +
                        '</a>' +
                        '</div>' +
                        '<p class="ellipsis">已有' + b.viewCount + '人关注</p>' +
                        '</div>' +
                        '<div class="clearfix"></div>' +
                        '<div class="bot-btn">' +
                        '<a href="mqqwpa://im/chat?chat_type=wpa&uin=1746295647&version=1&src_type=web&web_src=http://m.haishiit.com/">和顾问聊聊</a>' +
                        '<a href="mqqwpa://im/chat?chat_type=wpa&uin=2949709934&version=1&src_type=web&web_src=http://m.haishiit.com/">学校录取测评</a>' +
                        '</div>' +
                        '</li>';
                });
                str += '</ul>';
                $('.schoolList ul.data_list').append(str);
            }
            if(data.pageStr==''){
                $('.pageSize').empty();
            }else {
                $('.pageSize').empty();
                $('.pageSize').append(data.pageStr);
            }

        }
    })
}

function selectDiff(o) {
    $(o).addClass("on").siblings().removeClass("on");
    $(o).parents(".btn-group").addClass("open");
    $(o).find(".left-mask").show();
    $(o).siblings("li").find(".left-mask").hide();
}