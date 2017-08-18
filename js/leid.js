/**
 * Created by Administrator on 2017/8/17.
 */
var uid = localStorage.getItem("uid");
var pageSize = 20;
$(function () {
    var Requests = GetRequests();
    //var page = 1;
    //var type = 0;
    //0明细1收入2支出
    //tab切换
    $('.list_tab span').click(function () {
        var num = $(this).index();
        var type=$(this).attr('data-type');
        $(this).addClass('on').siblings('span').removeClass('on');
        contentStr(1,type);
        //$('.tab_item_wrap .tab_item').eq(num).fadeIn().siblings('ul.tab_item').hide();
    });
    //分页数据
    contentStr(1,0);
    $(document).on('click', '.pageSize li.iPage', function () {
        var page = parseInt($(this).html());
        var type = parseInt($('.list_tab span.on').attr('data-type'));
        contentStr(page, type)
    });
    //上一页
    $(document).on('click', '.pageSize li.prev', function () {
        var page = parseInt($('.pageSize li.on').html())-1;
        var type = parseInt($('.list_tab span.on').attr('data-type'));
            contentStr(page, type)

    });
    //下一页
    $(document).on('click', '.pageSize li.next', function () {
        var page = parseInt($('.pageSize li.on').html())+1;
        var type = parseInt($('.list_tab span.on').attr('data-type'));
        contentStr(page, type)
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
    myApp.filter('nullImg', function ($sce) {
        return function (img) {
            if (!img) {
                return 'images/default.png';
            }
            else {

                return httpUrl + img;
            }

        }
    });
    //通过模块生成调用控制器
    //myApp.controller("abroad_view", ["$scope", "$http", "$sce", function ($scope, $http, $sce) {
    //    $scope.toggle = {
    //        now: false
    //    };
    //    $http({
    //        method: 'post',
    //        url: httpUrl + '/cn/wap-api/my-integral',
    //        data: {
    //            uid: uid,
    //            page: page,
    //            pageSize: pageSize,
    //            type: type
    //        },
    //        headers: {
    //            'Content-Type': 'application/x-www-form-urlencoded'
    //        }
    //    }).success(function (data) {
    //        $scope.http = httpUrl;
    //        $scope.http2 = httpUrl2;
    //        $scope.data = data.details;
    //        $scope.integral = data.integral;
    //        $scope.pageStr = data.pageStr;
    //
    //    });
    //    $scope.led_tab = function (type) {
    //        $http({
    //            method: 'post',
    //            url: httpUrl + '/cn/wap-api/my-integral',
    //            data: {
    //                uid: uid,
    //                page: page,
    //                pageSize: pageSize,
    //                type: type
    //            },
    //            headers: {
    //                'Content-Type': 'application/x-www-form-urlencoded'
    //            }
    //        }).success(function (data) {
    //            $scope.http = httpUrl;
    //            $scope.http2 = httpUrl2;
    //            $scope.data = data.details;
    //            $scope.integral = data.integral;
    //            $scope.pageStr = data.pageStr;
    //        });
    //    };
    //    $('.pageSize li').click(function () {
    //        console.log('da')
    //    })
    //
    //}]);
});
function contentStr(page, type) {
    $.ajax({
        type: 'post',
        url: httpUrl + '/cn/wap-api/integral-page',
        data: {
            uid: uid,
            page: page,
            pageSize: pageSize,
            type: type
        },
        dataType: 'json',
        success: function (data) {
            var str = '';
            $('#tab_content').empty();
            $('.leid_num').html(data.integral);
            $('.pageSize').html(data.pageStr);
            $(data.details).each(function (a, b) {
                str += ' <tr>' +
                    '<td class="tl">' +
                    '<span>' + b.behavior + '</span></td>' +
                    '<td class="tm">' +
                    '<span>';
                if (b.type == 1) {
                    str += '<b class="light">+' + data.integral + '</b>'
                }
                if (b.type == 2) {
                    str += '<b>-' + b.integral + '</b>'
                }
                str += '</span>' +
                    '</td>' +
                    '<td class="tr">' +
                    '<span>' + b.createTime + '</span>' +
                    '</td>' +
                    '</tr>';
            });
            $('#tab_content').append(str);
        }
    })
}