$(function () {
    var Requests = GetRequests();
    var questionId = Requests['id'];
    var uid=localStorage.getItem('uid');

    var myApp = angular.module("myApp", []);
    $('.save').click(function () {
        var contents=$('#answer').val();
        if(!uid){
            var r = confirm("您还未登录，是否跳转到登录页！");
            if (r == true) {
                location.href = 'login.html';
            }
            else {
                return false;
            }
        }else {
            $.ajax({
                type: 'post',
                url: httpUrl + '/cn/wap-api/sub-answer',
                data: {
                    uid: uid,
                    questionId:questionId,
                    contents: contents
                },

                dataType: 'json',
                success: function (data) {
                    if(data.code==1){
                        alert('回答成功！');
                        location.href='fq_details.html?id='+questionId+'';
                    }else{
                        alert('回答失败！')
                    }


                }
            });
        }

    });
    myApp.filter('nullImg', function ($sce) {
        return function (img) {
            if (img) {
                return httpUrl + img;
            } else {
                return 'images/default.png';
            }
        }
    });
    myApp.controller("abroad_view", ["$scope", "$http", "$sce", function ($scope, $http, $sce) {
        $http({
            method: 'post',
            url: httpUrl + '/cn/wap-api/question-detail',
            data: {
                questionId: questionId
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function (data) {
            $scope.http = httpUrl;
            $scope.http2 = httpUrl2;
            $scope.question = data.question;
        });
    }]);

});