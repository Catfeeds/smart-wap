$(function () {
    var Requests = GetRequests();
    var uid=localStorage.getItem('uid');
    var myApp = angular.module("myApp", []);
    $.ajax({
        type: 'post',
        url: httpUrl + '/cn/wap-api/unread-message ',
        data: {
            uid: uid
        },
        dataType: 'json',
        success: function (data) {
            if(data.code==1){
                $('.msg_num ').show();
                $('.msg_hint img').show();
            }else {
                $('.msg_num ').hide();
                $('.msg_hint img').hide();
            }

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
            url: httpUrl + '/cn/wap-api/user-question',
            data: {
                uid: uid,
                page:1,
                pageSize:1000
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function (data) {
            $scope.http = httpUrl;
            $scope.http2 = httpUrl2;
            $scope.data = data.data;
        });
    }]);

});