$(function () {
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

            }
        });
        $http({
            method: 'get',
            url: 'http://www.smartapply.cn/cn/wap-api/document',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {}
        }).success(function (data) {
            $scope.wenshu = data.data;
           $scope.countPage=data.totalPage;

        });

    }]);
});
$(window).scroll(function () {
    //$(window).scrollTop()这个方法是当前滚动条滚动的距离
    //$(window).height()获取当前窗体的高度
    //$(document).height()获取当前文档的高度
    var page = $('.tj_body').attr("data-page");
    var bot = 10; //bot是底部距离的高度
    var str='';
    var countPage=$('#page').val();
    if ((bot + $(window).scrollTop()) >= ($(document).height() - $(window).height())&&page<=countPage) {
        //当底部基本距离+滚动的高度〉=文档的高度-窗体的高度时；
        //我们需要去异步加载数据了
        $('.tj_body').attr("data-page",parseInt(page)+1);
        $.getJSON("http://www.smartapply.cn/cn/wap-api/document", {page: page}, function (data) {
            for(var i=0;i<data.data.length;i++){
                str+='<li ng-repeat="data in wenshu">' +
                    '            <div>' +
                    '                <a class="flex-container-left link_ws" href="diy.html?id='+data.data[i].id+'" target="_blank">' +
                    '                <div class="ws_img"><img src="http://www.smartapply.cn'+data.data[i].image+'" alt=""></div>' +
                    '                <div class="ws_de_wrap">' +
                    '                    <p class="ellipsis-2 ws_name">'+data.data[i].name+'</p>' +
                    '                    <p class="ellipsis-3 ws_de">'+data.data[i].answer+'</p>' +
                    '                    <div class="tr ed_wrap_btn"><span class="ed_btn inm tm">查看详情</span></div>' +
                    '                </div>' +
                    '                </a>' +
                    '            </div>' +
                    '        </li>';
            }
            $('.tj_list').append(str);
        });
    }
});