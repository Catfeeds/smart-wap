$(function(){
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

            }
        });
        $http({
            method: 'get',
            url: 'http://www.smartapply.cn/cn/wap-api/document',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {

            }
        }).success(function (data) {
            $scope.wenshu=data.data;
        });

    }]);
});

function changeWshu(o){
    var str='';
    var page=$(o).attr("data-page");
    $.ajax({
        url:"http://www.smartapply.cn/cn/wap-api/document",
        type:"get",
        data:{
            page:page
        },
        dataType:"json",
        success:function(data){
            if(page<data.totalPage){
                $(o).attr("data-page",parseInt(page)+1);
            }else{
                if(page>1){
                    page--;
                    $(o).attr("data-page",page);
                }else{
                    page++;
                    $(o).attr("data-page",page);
                }
            }
            $("#wenshu").html("");
            for(var i=0;i<data.data.length;i++){
                str+='<li ng-repeat="wenshuT in wenshu">'+
                    '<a href="#">'+
                    '<div class="pt_img fl"><img src="http://www.smartapply.cn'+data.data[i].image+'" alt=""></div>'+
                    '<div class="fl pt_info_wrap">'+
                    ' <p class="pt_tit ellipsis">'+data.data[i].name+'</p>'+
                    ' <p class="pt_de ellipsis-2">'+data.data[i].answer+'</p>'+
                    '<a class="mall_btn inm tm" href="diy.html?id='+data.data[i].id+'">查看详情</a>'+
                    '</div>'+
                    '</a>'+
                    '</li>';
            }
            $("#wenshu").append(str);

        }

    });
}