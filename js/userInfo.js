$(function () {
    var Requests = GetRequests();
    var uid=localStorage.getItem('uid');
    var myApp = angular.module("myApp", []);
    myApp.filter('nullImg', function ($sce) {
        return function (img) {
            if (img) {
                return httpUrl + img;
            } else {
                return 'images/default.png';
            }
        }
    });
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
    myApp.filter('nullData', function ($sce) {
        return function (data) {
            if (data) {
                return data;
            } else {
                return '未填写';
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
                var username = sessionStorage.getItem('re_username');
                var school = sessionStorage.getItem('re_school');
                var major = sessionStorage.getItem('re_major');
                var grade = sessionStorage.getItem('re_grade');
                var phone = sessionStorage.getItem('re_phone');
                if(username){
                    $('#username').html(username);
                }
                if(school){
                    $('#school').html(school);
                }
                if(major){
                    $('#major').html(major);
                }
                if(grade){
                    $('#grade').html(grade);
                }
                if(phone){
                    $('#phone').html(phone);
                }

            }
        });
        $http({
            method: 'post',
            url: httpUrl + '/cn/wap-api/personal-data',
            data: {
                uid: uid
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function (data) {
            $scope.http = httpUrl;
            $scope.http2 = httpUrl2;
            $scope.data=data.data;
            $scope.username=data.data.userName;
            $scope.school = data.data.school;
            $scope.major = data.data.major;
            $scope.grade = data.data.grade;
            $scope.phone = data.data.phone;
        });
    }]);
    // 发送验证码
    $('#code_btn').click(function () {
        var phone=$('#phone').html();
        console.log(phone);
        if(!phone){
            alert('请输入电话号码');
            return false;
        }else {
            $.ajax({
                type : "post",
                url : "http://login.gmatonline.cn/cn/wap-api/phone-code",
                dataType : "json",
                data:{
                    phoneNum:phone,
                    type:5
                },
                success:function (data) {
                    console.log(data)
                }
            })
        }

    });
    // 保存
    $('.save').click(function () {
      var phoneCode=$('#code_val').val();
      var username=$('#username').html();
      var school=$('#school').html();
      var major=$('#major').html();
      var grade=$('#grade').html();
      var phone=$('#phone').html();
      if(!phoneCode){
          alert('请输入短信验证码！');
          return false;
      }else {
          $.ajax({
              type : "post",
              url : httpUrl + '/cn/wap-api/change-user-info',
              dataType : "json",
              data:{
                  uid:uid,
                  phoneCode:phoneCode,
                  phone:phone,
                  nickname:username,
                  school:school,
                  major:major,
                  grade:grade
              },
              success:function (data) {
                  alert(data.message);
                  sessionStorage.removeItem('re_username');
                  sessionStorage.removeItem('re_school');
                  sessionStorage.removeItem('re_major');
                  sessionStorage.removeItem('re_grade');
                  sessionStorage.removeItem('re_phone');
              }
          })
      }

    })

});