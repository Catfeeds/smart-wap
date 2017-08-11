/**
 * Created by Administrator on 2017/7/17.
 */
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
    myApp.filter('nullImg', function () {
        return function (img) {
            if (img) {
                return httpUrl + img;
            } else {
                return 'images/an-img/know-poster.png';
            }
        }
    });
    //通过模块生成调用控制器
    myApp.controller("abroad_view", ["$scope", "$http", "$sce", function ($scope, $http, $sce) {
        $scope.toggle = {
            now: false
        };
        $scope.$watch('toggle.now',function(){
            if($scope.toggle.now){
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

                });

                $(".tabs span").click(function (e) {
                    e.preventDefault();
                });

            }
        });

        $http({
            method: 'post',
            url: httpUrl + '/cn/wap-api/know',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function (data) {
            var regExp = new RegExp("files|/files", 'g');
            $scope.http = httpUrl;
            $scope.http2 = httpUrl2;
            $scope.know=data.know;
            $scope.video=data.video;

        });

    }]);
});