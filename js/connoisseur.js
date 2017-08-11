$(function () {
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
    myApp.filter('nullAlter', function () {
        return function (address) {
            if (!address) {
                return "成都";
            } else {
                return address;
            }
        }
    });
    //通过模块生成调用控制器
    myApp.controller("abroad_view", ["$scope", "$http", "$sce", function ($scope, $http, $sce) {
        $scope.toggle = {
            now: false
        };
        $scope.$watch('toggle.now', function () {
            if ($scope.toggle.now) {
                $(".r-tag").each(function () {
                    var rightW = $(this).parents(".list-title").find("span").width() + 5 + "px";
                    $(this).css("left", rightW);
                });
                var swiper = new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    slidesPerView: 3,
                    paginationClickable: true,
                    spaceBetween: 0,
                    loop: true,
                    autoplay: 1000
                });
            }
        });
        $http({
            method: 'post',
            url: 'http://www.smartapply.cn/cn/wap-api/mall-consultant',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {}
        }).success(function (data) {
            $scope.countrys = data.country;
            $scope.teachers = data.data.data;
            $scope.hots = data.hot;
            $scope.pages = data.data.pageStr;
            $("#pageTotal").val(data.data.totalPage);
        });

    }]);
//分页点击
    $(document).on("click", ".s-page li", function () {
        var index = $(this).index();
        if (index != 0 && index != parseInt($(".s-page li").length) - 1) {
            var oid = $(".country-right ul li.on").attr("data-sid");
            var sortT = $(".choose-span.on").attr("data-sort");
            var number = $(this).html();
            $(this).addClass("on").siblings("li").removeClass("on");
            contentStr(oid, sortT, number);
        }
    });
    //上一页
    $(document).on("click", ".s-page .prev", function () {
        var oid = $(".country-right ul li.on").attr("data-sid");
        var sortT = $(".choose-span.on").attr("data-sort");
        var number = parseInt($(".s-page ul li.on").html()) - 1;
        if (number != 0) {
            $(".s-page ul li.on").prev("li").addClass("on").siblings("li").removeClass("on");
            contentStr(oid, sortT, number);
        }
    });
    //下一页
    $(document).on("click", ".s-page .next", function () {
        var oid = $(".country-right ul li.on").attr("data-sid");
        var sortT = $(".choose-span.on").attr("data-sort");
        var number = parseInt($(".s-page ul li.on").html()) + 1;
        var totalPage = $("#pageTotal").val();
        if (number <= totalPage) {
            $(".s-page ul li.on").next("li").addClass("on").siblings("li").removeClass("on");
            contentStr(oid, sortT, number);
        }
    });
});
//申请国家
function clickCountry(o) {
    var oid = $(o).attr("data-sid");
    var sortT = $(".choose-span.on").attr("data-sort");
    var number = $(".s-page ul li.on").html();
    $(o).addClass("on").siblings("li").removeClass("on");
    contentStr(oid, sortT, number);
}
//排序
function twoSorts(o) {
    var oid = $(".country-right ul li.on").attr("data-sid");
    var sortT = $(o).attr("data-sort");
    var number = $(".s-page ul li.on").html();
    $(o).addClass("on").siblings().removeClass("on");
    contentStr(oid, sortT, number);
}

//拼字符串
function contentStr(oid, sortT, pageNum) {
    $.ajax({
        url: "http://www.smartapply.cn/cn/wap-api/adviser-class",
        type: "get",
        data: {
            country: oid,
            sort: sortT,
            page: pageNum
        },
        dataType: "json",
        success: function (data) {
            var str = '';
            $("#pageTotal").val(data.totalPage);
            $(".s-page ul").html(data.pageStr);
            $(".t-l-con ul").html("");
            for (var i = 0; i < data.data.length; i++) {
                str += '<li>' +
                    '<div class="list-left">' +
                    '<img src="http://www.smartapply.cn' + data.data[i].image + '" alt="老师头像"/>' +
                    '</div>' +
                    '<div class="list-center">' +
                    '<div class="list-title">' +
                    '<span>' + data.data[i].name + '</span>' +
                    '<div class="r-tag">' + data.data[i].source + '</div>' +
                    '</div>' +
                    '<p>' + data.data[i].buyNum + '</p>' +
                    '<p>从业' + data.data[i].age + '年</p>' +
                    '</div>' +
                    '<div class="list-right">' +
                    '<p>已帮助<span>' + data.data[i].students + '</span>位学生拿到录取</p>' +
                    '<a href="teacher_details_2.html?contentid=' + data.data[i].id + '">点击咨询</a>' +
                    ' </div>' +
                    '<div class="clearfix"></div>' +
                    '</li>';
            }
            $(".t-l-con ul").append(str);
            //老师标签定位
            $(".r-tag").each(function () {
                var rightW = $(this).parents(".list-title").find("span").width() + 5 + "px";
                $(this).css("left", rightW);
            });
        }
    });
}