/**
 * Created by Administrator on 2017/7/14.
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
    //通过模块生成调用控制器
    myApp.controller("abroad_view", ["$scope", "$http", "$sce", function ($scope, $http, $sce) {
        $scope.toggle = {
            now:false
        };
        $scope.$watch('toggle.now',function(){
            if($scope.toggle.now){
                var tabsSwiper;
                tabsSwiper = new Swiper('.swiper-container', {
                    speed : 500,
                    observer: true,
                    observeParents: true,
                    onSlideChangeStart : function() {
                        $(".tabs .on").removeClass('on');
                        $(".tabs li:not(.list_more)").eq(tabsSwiper.activeIndex).addClass('on');
                    }
                });
                $(".tabs li:not(.list_more)").on('touchstart mousedown', function(e) {
                    e.preventDefault();
                    $(".tabs .active").removeClass('on');
                    $(this).addClass('on');
                    tabsSwiper.swipeTo($(this).index());

                });

                $(".tabs li:not(.list_more)").click(function(e) {
                    e.preventDefault();
                });

            }
        });
        $http({
            method: 'post',
            url: httpUrl+'/cn/wap-api/raiders',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function (data) {
            $scope.http = httpUrl;
            $scope.http2 = httpUrl2;
            $scope.items1=data.data[0];
            $scope.items2=data.data[1];
            $scope.items3=data.data[2];
            $scope.items4=data.data[3];
            $scope.items5=data.data[4];

        });

    }]);
});