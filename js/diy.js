/**
 * Created by Administrator on 2017/7/14.
 */
$(function () {
    var Requests = GetRequests();
    var id = Requests['id'];
    var uid = localStorage.getItem("uid");
    var sp_item = localStorage.getItem('sp_item');//取本地商品数据；
    var sp_itemB = [{
        sp_id: '',
        count: '',
        name: '',
        src: '',
        price: ''
    }];
    $('.dh_btn').click(function () {
        if (!uid) {
            var r = confirm("您还未登录，是否跳转到登录页！");
            if (r == true) {
                location.href = 'login.html';
            }
            else {
                return false;
            }

        } else {
            location.href = 'order.html?id=' + id + '';
        }


    });
    //加入购物车
    $('.cart_btn').click(function () {
        var imgSrc = $('.course-img img').attr("src");
        var spPrice = $('#sp_price').val();
        var spName = $('#sp_name').val();
        if (!sp_item) {//如果本地数据为空，存入数据；
            sp_itemB[0].sp_id = id;
            sp_itemB[0].count = 1;
            sp_itemB[0].name = spName;
            sp_itemB[0].src = imgSrc;
            sp_itemB[0].price = spPrice;
            localStorage.setItem("sp_item", JSON.stringify(sp_itemB));
            location.href = 'settlement.html';
        } else {
            var arr = {
                sp_id: '',
                count: '',
                name: '',
                src: '',
                price: ''
            };
            var test = $.parseJSON(sp_item);//如果不为空，取出数据；
            $(test).each(function (a, b) {
                if (b.sp_id == id) {
                    alert("该商品已加入购物车!");
                    remove(arr);
                    return false;
                } else {
                    arr.sp_id=id;
                    arr.count=1;
                    arr.name=spName;
                    arr.src=imgSrc;
                    arr.price=spPrice;
                }

            });
            test.push(arr);
            console.log(test);
            localStorage.setItem("sp_item", JSON.stringify(test));
            location.href = 'settlement.html';

        }

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
    //通过模块生成调用控制器
    myApp.controller("abroad_view", ["$scope", "$http", "$sce", function ($scope, $http, $sce) {
        $scope.toggle = {
            now: false
        };
        $scope.$watch('toggle.now', function () {
            if ($scope.toggle.now) {
                var tabsSwiper;
                tabsSwiper = new Swiper('.swiper-container', {
                    observer: true,
                    observeParents: true,
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
            url: httpUrl + '/cn/wap-api/goods-detail',
            data: {
                id: id
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function (data) {
            var regExp = new RegExp("files|/files", 'g');
            $scope.http = httpUrl;
            $scope.http2 = httpUrl2;
            $scope.data = data.data;
            $scope.data2 = data.commodity[0];
            $scope.reply = data.comment;
            $scope.contenttext = $sce.trustAsHtml(escape2Html(data.data.detailed.replace(regExp, 'http://www.smartapply.cn/files')));


        });

    }]);
});