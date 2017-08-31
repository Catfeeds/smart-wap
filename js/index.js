/**
 * Created by Administrator on 2017/6/29.
 */
$(function() {
    var Requests = GetRequests();
    var uid = localStorage.getItem("uid");
    if(!uid){
        $('#user').attr('href','login.html')
    }else {
        $('#user').attr('href','user_center.html')
    }
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
    myApp.filter('nullImg', function ($sce) {
        return function (img) {
            if(!img){
                return 'images/str_img.png';
            }
            else {

                return httpUrl+img;
            }

        }
    });
    //通过模块生成调用控制器
    myApp.controller("abroad_view",["$scope","$http","$sce",function($scope,$http,$sce){
        $http({
            method: 'get',
            url: httpUrl+'/cn/wap-api/index1',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(data) {
            $scope.http = httpUrl;
            $scope.http2 = httpUrl2;
            $scope.question=data.question;
            $scope.majorHot=data.majorHot;
            $scope.school=data.school;
            $scope.raiders=data.raiders;
            $scope.scArr=[];
            var regExp = new RegExp("、|,", 'g');
           angular.forEach($scope.majorHot,function (e,k) {
               $scope.xg_sc=$scope.majorHot[k].duration.split(regExp);
               $scope.scArr.push($scope.xg_sc);
           });

        });
    }]);
    $('.form_btn').click(function(){
        var country=$('#country').val();
        var major=$('#major').val();
        var grade=$('#grade').val();
        var phone=$('#phone').val();
        var regexp=/^1[3|4|5|7|8][0-9]{9}$/;
        if(regexp.test(phone)){
            $.ajax({
                url:httpUrl+'/cn/wap-api/programme',
                dataType:'json',
                type:'post',
                data:{
                    country:country,
                    major:major,
                    grade:grade,
                    phone:phone
                },
                success:function(data){
                    alert(data.message);
                }
            })
        }else {
            alert('请输入正确的手机号码！');
        }

    })
});
