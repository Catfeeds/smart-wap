/**
 * Created by Administrator on 2017/7/18.
 */
$(function () {
    var Requests = GetRequests();
    var id = Requests['id'];
    var sp_item = $.parseJSON(localStorage.getItem('sp_item'));
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
        //结算
        $scope.pay=function(){
            var id=[];
            var num=[];
            var sp_itemA = [];
            var uid = localStorage.getItem('uid');
            $("input[name='subBox']:checked").each(function () {
                id.push($(this).attr('data-checkId'));
                num.push($(this).parents('li').find('.sp_num_int').val());
                var imgSrc = $(this).parents('li').find('.cn_img img').attr("src").split(".cn")[1];
                var spPrice = $(this).parents('li').find('.sp_price_num').html();
                var spName = $(this).parents('li').find('.sp_name ').html();
                var spId = $(this).attr('data-checkId');
                var spNum = $(this).parents('li').find('.sp_num_int').val();
                var arr = {
                    sp_id: spId,
                    num: spNum,
                    contentName: spName,
                    image: imgSrc,
                    price: spPrice
                };
                sp_itemA.push(arr);
                localStorage.setItem("sp_itemA", JSON.stringify(sp_itemA));
            });
            if(id==''){
                alert('请选择结算商品！');
                return false;
            }
            if(!uid){
                var r = confirm("您还未登录，是否跳转到登录页！");
                if (r == true) {
                    location.href = 'login.html';
                }
                else {
                    return false;
                }
            }else {
                $http({
                    method: 'post',
                    url: httpUrl + '/cn/wap-api/buy-now',
                    data: {
                        uid: uid,
                        id: id,
                        num: num
                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).success(function (data) {
                    $scope.http = httpUrl;
                    $scope.http2 = httpUrl2;
                    $scope.data = data.data;
                    sessionStorage.setItem('sequence',data.sequence);
                    var cp={totalMoney:data.data.totalMoney};
                    sessionStorage.setItem('countPrice',JSON.stringify(cp));
                    location.href='order.html';
                });
            }

        };
        $scope.list=sp_item;
        $scope.count=sp_item.length;

    }]);
});