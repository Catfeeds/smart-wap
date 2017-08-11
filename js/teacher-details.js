$(function () {
    var Requests = GetRequests();
    var contentid = Requests['contentid'];
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
    myApp.filter('nullImg', function () {
        return function (img) {
            if (img) {
                return httpUrl + img;
            } else {
                return 'images/an-img/teacher-answer.png';
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
                var tabsSwiper;
                tabsSwiper = new Swiper('.swiper-container', {
                    speed: 500,
                    onSlideChangeStart: function () {
                        $(".tabs .active").removeClass('active');
                        $(".tabs span").eq(tabsSwiper.activeIndex).addClass('active');
                    }
                });


                $(".tabs span").on('touchstart mousedown', function (e) {
                    e.preventDefault();
                    $(".tabs .active").removeClass('active');
                    $(this).addClass('active');
                    tabsSwiper.swipeTo($(this).index());
                    //swiper-slide-active
                   //var p_height=$('.swiper-slide-active .slide_content').height();


                });

                $(".tabs span").click(function (e) {
                    e.preventDefault();
                });
            }
        });
        $http({
            method: 'post',
            url: 'http://www.smartapply.cn/cn/wap-api/adviser-detail',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                contentid: contentid
            }
        }).success(function (data) {
            $scope.http = httpUrl;
            $scope.http2 = httpUrl2;
            $scope.teacherT = data.data[0];
            $scope.caseList = data.caseList;
            $scope.answer = data.answer;
            $scope.school = data.school;
            $scope.caseCount = data.caseList.length;
            $scope.answerCount = data.answer.length;
            console.log(data.caseList.length, data.answer.length)
        });

    }]);
});

function seeMore(o) {
    var num = $(".answerBox ul li").length;
    if ($(o).html() == "加载更多") {
        var nowHeight = $("#moreId ul").height();
        $("#moreId").animate({
            height: nowHeight + 34 + "px"
        });
        $(o).html("收起");
    } else {
        $("#moreId").animate({
            height: 230 + "px"
        });
        $(o).html("加载更多");
    }

}