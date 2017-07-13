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
    myApp.filter('suan', function () {
        return function (content) {
            return Math.round((content)*10/3+5);
        }
    });
    //通过模块生成调用控制器
    myApp.controller("abroad_view", ["$scope", "$http", "$sce", function ($scope, $http, $sce) {
        $scope.toggle = {
            now:false
        };
        $scope.$watch('toggle.now',function(){
            if($scope.toggle.now){
               $("#typeUl li:first-child").addClass("on");
               $("#yearUl li:nth-child(2)").addClass("on");
            }
        });
        $http({
            method: 'get',
            url: 'http://www.smartapply.cn/cn/wap-api/university-rank',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {

            }
        }).success(function (data) {
             $scope.types=data.types;
             $scope.years=data.years;
             $scope.schools=data.data.data;
            $scope.pageStr=data.data.pageStr;
            $scope.case=data.case;
            $("#pageTotal").val(data.data.totalPage);
        });

    }]);
    //分页点击
    $(document).on("click",".s-page li",function(){
        var index=$(this).index();
        if(index!=0&&index!=parseInt($(".s-page li").length)-1){
            var type=$("#typeUl li.on").attr("data-mid");
            var year=$("#yearUl li.on").attr("data-mid");
            var pageNum=$(this).index();
            $(this).addClass("on").siblings("li").removeClass("on");
            contentStr(type,year,pageNum,'cur');
        }
    });
    //上一页
    $(document).on("click",".s-page .prev",function(){
        var type=$("#typeUl li.on").attr("data-mid");
        var year=$("#yearUl li.on").attr("data-mid");
        var pageNum=parseInt($(".s-page ul li.on").html())-1;
        if(pageNum!=0){
            $(".s-page ul li.on").prev("li").addClass("on").siblings("li").removeClass("on");
            contentStr(type,year,pageNum);
        }
    });
    //下一页
    $(document).on("click",".s-page .next",function(){
        var type=$("#typeUl li.on").attr("data-mid");
        var year=$("#yearUl li.on").attr("data-mid");
        var pageNum=parseInt($(".s-page ul li.on").html())+1;
        var totalPage=$("#pageTotal").val();
        if(pageNum<=totalPage){
            $(".s-page ul li.on").next("li").addClass("on").siblings("li").removeClass("on");
            contentStr(type,year,pageNum);
        }
    });
});

//类型
function clickType(o){
    var type=$(o).attr("data-mid");
    var year=$("#yearUl li.on").attr("data-mid");
    var pageNum=$(".s-page ul li.on").html();
    $(o).addClass("on").siblings().removeClass("on");
    contentStr(type,year,pageNum);
}
//年份
function clickYears(o){
    var type=$("#typeUl li.on").attr("data-mid");
    var year=$(o).attr("data-mid");
    var pageNum=$(".s-page ul li.on").html();
    $(o).addClass("on").siblings().removeClass("on");
    contentStr(type,year,pageNum);
}

//拼字符串
function contentStr(type,year,pageNum,strF){
    $.ajax({
        url:"http://www.smartapply.cn/cn/wap-api/rank-class",
        type:"get",
        data:{
            type:type,
            year:year,
            page:pageNum
        },
        dataType:"json",
        success:function(data){
            var str='';
            $("#pageTotal").val(data.totalPage);
            if(!strF){
                $(".s-page ul").html(data.pageStr);
            }
            $(".s-l-con ul").html("");
            for(var i=0;i<data.data.length;i++){
                str+='<li ng-repeat="schoolsT in schools">'+
                    '<div class="s-c-left">'+
                '<span>NO.'+(i+1)+'</span>'+
                '<img src="images/an-img/rank-blueJ.png" alt="箭头图标"/>'+
                '</div>'+
                '<div class="s-c-center">'+
                '<h4 class="ellipsis">'+data.data[i].name+'</h4>'+
                '<p class="ellipsis">'+data.data[i].title+'</p>'+
                '</div>'+
                '<div class="s-c-right">'+
                '<a href="#">查看学校</a>'+
                '<p class="ellipsis">查看人数:<span>3695</span>'+
                '评论:<span>1671</span></p>'+
                '</div>'+
                '<div class="clearfix"></div>'+
                '</li>';
            }
            $(".s-l-con ul").append(str);

        }
    });
}