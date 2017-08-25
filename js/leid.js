/**
 * Created by Administrator on 2017/8/17.
 */
var uid = localStorage.getItem("uid");
var pageSize = 20;
$(function () {
    var Requests = GetRequests();
    //var page = 1;
    //var type = 0;
    //0明细1收入2支出
    //tab切换
    $('.list_tab span').click(function () {
        var num = $(this).index();
        var type=$(this).attr('data-type');
        $(this).addClass('on').siblings('span').removeClass('on');
        contentStr(1,type);
        //$('.tab_item_wrap .tab_item').eq(num).fadeIn().siblings('ul.tab_item').hide();
    });
    //分页数据
    contentStr(1,0);
    $(document).on('click', '.pageSize li.iPage', function () {
        var page = parseInt($(this).html());
        var type = parseInt($('.list_tab span.on').attr('data-type'));
        contentStr(page, type)
    });
    //上一页
    $(document).on('click', '.pageSize li.prev', function () {
        var page = parseInt($('.pageSize li.on').html())-1;
        var type = parseInt($('.list_tab span.on').attr('data-type'));
            contentStr(page, type)

    });
    //下一页
    $(document).on('click', '.pageSize li.next', function () {
        var page = parseInt($('.pageSize li.on').html())+1;
        var type = parseInt($('.list_tab span.on').attr('data-type'));
        contentStr(page, type)
    });
});
function contentStr(page, type) {
    $.ajax({
        type: 'post',
        url: httpUrl + '/cn/wap-api/integral-page',
        data: {
            uid: uid,
            page: page,
            pageSize: pageSize,
            type: type
        },
        dataType: 'json',
        success: function (data) {
            var str = '';
            $('#tab_content').empty();
            $('.leid_num').html(data.integral);
            $('.pageSize').html(data.pageStr);
            $(data.details).each(function (a, b) {
                str += ' <tr>' +
                    '<td class="tl">' +
                    '<span>' + b.behavior + '</span></td>' +
                    '<td class="tm">' +
                    '<span>';
                if (b.type == 1) {
                    str += '<b class="light">+' + data.integral + '</b>'
                }
                if (b.type == 2) {
                    str += '<b>-' + b.integral + '</b>'
                }
                str += '</span>' +
                    '</td>' +
                    '<td class="tr">' +
                    '<span>' + b.createTime + '</span>' +
                    '</td>' +
                    '</tr>';
            });
            $('#tab_content').append(str);
        }
    })
}