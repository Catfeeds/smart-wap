/**
 * Created by Administrator on 2017/7/17.
 */
$(function () {
    var Requests = GetRequests();
    var id = Requests['id'];
    var uid = localStorage.getItem('uid');
    var userName = localStorage.getItem('userName');
    var sp_itemA = $.parseJSON(localStorage.getItem('sp_itemA'));
    //提交订单
    $('.tj_order').click(function(){
        var addresId=$('.adr_list li.on').attr('data-resId');
        $.ajax({
            type:'get',
            url:'http://order.viplgw.cn/pay/wap-api/sub-order',
            dataType:'json',
            data:{
                consignee:addresId,//地址ID；
                type:0,
                payType:1,
                integral:0,
                orderData:sessionStorage.getItem('sequence'),
                uid:uid
            },
            success:function(data){
                if(data.code==1){
                    location.href="http://order.gmatonline.cn/pay/order/pay?orderId="+data.orderId+"&server=wap"
                        +"&uid="+uid+"&username="+userName+"";
                }else {
                    alert(data.message)
                }
            }
        })
    });
    //查询用户收货地址
    $.ajax({
        url: "http://order.viplgw.cn/pay/wap-api/get-consignee",
        data: {
            uid: uid
        },
        type: "get",
        dataType: "json",
        success: function (data) {
            var str = '';
            $('.adr_list ').empty();
            if (data == '') {
                alert('你还未添加收货地址！！');
                return false;
            } else {
                $(data).each(function (a, b) {
                    if(a==0){
                        str += ' <li class="on" data-resId="'+b.id+'" onclick="checkOn(this)">' +
                            '<div class="flex-container adr_info">' +
                            '<p class="adr_name">'+b.name+'</p>' +
                            '<p class="adr">'+b.province+''+b.city+''+b.area+'</p>' +
                            '<p class="adr_phone">'+b.phone+'</p>' +
                            '</div>' +
                            '<img class="true_img" src="images/true_1.png" style="height: 0.9rem;" alt="">' +
                            '</li>';
                    }else {
                        str += ' <li data-resId="'+b.id+'" onclick="checkOn(this)">' +
                            '<div class="flex-container adr_info">' +
                            '<p class="adr_name">'+b.name+'</p>' +
                            '<p class="adr">'+b.province+''+b.city+''+b.area+'</p>' +
                            '<p class="adr_phone">'+b.phone+'</p>' +
                            '</div>' +
                            '<img class="true_img" src="images/true_1.png" style="height: 0.9rem;" alt="">' +
                            '</li>';
                    }

                });
                $('.adr_list ').append(str);
            }
        }
    });
    //地址三级联动
    initComplexArea('seachprov', 'seachcity', 'seachdistrict', area_array, sub_array, '0', '0', '0');
    $('.add_adr').click(function(){
        $('.new_adr_wrap').show();
    });
    $('.close_btn').click(function(){
        $('.new_adr_wrap').hide();
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
        $scope.http = httpUrl;
        $scope.http2 = httpUrl2;
        $scope.toggle = {
            now: false
        };
        $http({
            method: 'post',
            url: httpUrl + '/cn/wap-api/buy-now',
            data: {
                uid: uid,
                id: id,
                num: 1
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function (data) {
            $scope.data = data.data;
            $scope.list = data.data.goods;
            sessionStorage.setItem('sequence',data.sequence)

        });
        console.log(sp_itemA);
        $scope.list=sp_itemA;
        $scope.data=$.parseJSON(sessionStorage.getItem('countPrice'));
        //$scope.data.totalMoney=sessionStorage.getItem('countPrice');

    }]);
});

function checkOn(e){
    $(e).addClass("on").siblings("li").removeClass("on");
}
//得到地区码
function getAreaID() {
    var area = 0;
    if ($("#seachdistrict").val() != "0") {
        area = $("#seachdistrict").val();
    } else if ($("#seachcity").val() != "0") {
        area = $("#seachcity").val();
    } else {
        area = $("#seachprov").val();
    }
    return area;
}
//保存地址信息
function showAreaID() {
    //地区码
    var areaID = getAreaID();
    //地区名
    var areaName = getAreaNamebyID(areaID);
    //参数值
    var name = $("#name").val();
    var address = $("#addressInt").val();
    var phone = $("#phone").val();
    var alias = $("#alias").val();
    var province = areaName.split("/")[0];
    var city = areaName.split("/")[1];
    var area = areaName.split("/")[2];
    var uid = localStorage.getItem("uid");
    if (province == "") {
        alert("请选择所在地区");
        return false;
    }
    if (city == undefined) {
        city = "";
    }
    if (area == undefined) {
        area = "";
    }
    if (name == "") {
        alert("请填写收货人;");
        return false;
    }
    if (address == "") {
        alert("请填写详细地址");
        return false;
    }
    if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
        alert("请填正确的手机格式;");
        return false;
    }
    if (phone == "") {
        alert("请填写手机号码;");
        return false;
    } else {
        $.ajax({
            url: "http://order.viplgw.cn/pay/wap-api/save-consignee",
            method: "get",
            dataType: "json",
            data: {
                name: name,
                address: address,
                phone: phone,
                province: province, //省
                city: city,//市
                area: area,//县
                alias: alias,
                id: '',
                uid: uid
            },
            success: function (data) {
                var str='';
                alert(data.message);
                $('.new_adr_wrap').hide();
                $.ajax({
                    url: "http://order.viplgw.cn/pay/wap-api/get-consignee",
                    data: {
                        uid: uid
                    },
                    type: "get",
                    dataType: "json",
                    success: function (data) {
                        var str = '';
                        $('.adr_list ').empty();
                        if (data == '') {
                            alert('你还未添加收货地址！！');
                            return false;
                        } else {
                            $(data).each(function (a, b) {
                                if(a==0){
                                    str += ' <li class="on" data-resId="'+b.id+'" onclick="checkOn(this)">' +
                                        '<div class="flex-container adr_info">' +
                                        '<p class="adr_name">'+b.name+'</p>' +
                                        '<p class="adr">'+b.province+''+b.city+''+b.area+'</p>' +
                                        '<p class="adr_phone">'+b.phone+'</p>' +
                                        '</div>' +
                                        '<img class="true_img" src="images/true_1.png" style="height: 0.9rem;" alt="">' +
                                        '</li>';
                                }else {
                                    str += ' <li data-resId="'+b.id+'" onclick="checkOn(this)">' +
                                        '<div class="flex-container adr_info">' +
                                        '<p class="adr_name">'+b.name+'</p>' +
                                        '<p class="adr">'+b.province+''+b.city+''+b.area+'</p>' +
                                        '<p class="adr_phone">'+b.phone+'</p>' +
                                        '</div>' +
                                        '<img class="true_img" src="images/true_1.png" style="height: 0.9rem;" alt="">' +
                                        '</li>';
                                }

                            });
                            $('.adr_list ').append(str);
                        }
                    }
                });

            }
        });
    }

}

//根据地区码查询地区名
function getAreaNamebyID(areaID) {
    var areaName = "";
    if (areaID.length == 2) {
        areaName = area_array[areaID];
    } else if (areaID.length == 4) {
        var index1 = areaID.substring(0, 2);
        areaName = area_array[index1] + " " + sub_array[index1][areaID];
    } else if (areaID.length == 6) {
        var index1 = areaID.substring(0, 2);
        var index2 = areaID.substring(0, 4);
        areaName = area_array[index1] + "/" + sub_array[index1][index2] + "/" + sub_arr[index2][areaID];
    }
//        返回地区名字
    return areaName;
}