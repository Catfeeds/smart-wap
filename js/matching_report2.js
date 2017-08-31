$(function () {
    var Requests = GetRequests();
    var id = Requests['id'];
    var uid = localStorage.getItem('uid');
    //通过模块生成调用控制器
    $.ajax({
        type: 'post',
        url: httpUrl + '/cn/wap-api/odds-result',
        data: {
            uid: uid,
            id: id
        },
        dataType: 'json',
        success: function (data) {
            $('.str_sort').html(data.data.percent);
            if (data.data.percent < 50) {
                $('.bfb_sort').html("40%");
            }
            if (data.data.percent < 60 && data.data.percent > 50) {
                $('.bfb_sort').html("50%");
            }
            if (data.data.percent < 70 && data.data.percent > 60) {
                $('.bfb_sort').html("60%");
            }
            if (data.data.percent < 80 && data.data.percent > 70) {
                $('.bfb_sort').html("70%");
            }
            if (data.data.percent < 90 && data.data.percent > 80) {
                $('.bfb_sort').html("80%");
            }
            if (data.data.percent < 99 && data.data.percent > 90) {
                $('.bfb_sort').html("89%");
            }
        }

    })


});