$(function () {
    var Requests = GetRequests();
    var uid = localStorage.getItem('uid');
    $.ajax({
        type: 'post',
        url: httpUrl + '/cn/wap-api/question',
        data: {
            tag: '',
            page: 1,
            pageSize: 20
        },
        dataType: 'json',
        success: function (data) {
            var tagStr = '<div class="swiper-slide active"><span tag-id="0">全部</span></div>';
            var dataStr = '';
            $('.pageSize').empty();
            $(data.tags).each(function (a, b) {
                tagStr += '<div class="swiper-slide"><span tag-id="' + data.tags[a].id + '">' + data.tags[a].name + '</span></div>'
            });
            $(data.data.data).each(function (i, j) {
                dataStr += '<li>' +
                    '<a href="fq_details.html?id=' + data.data.data[i].id + '">' +
                    '<div>' +
                    '<h1 class="ques_name">' + data.data.data[i].question + '</h1>' +
                    '<p class="ques_de">' + data.data.data[i].content + '</p>' +
                    '<div class="tag_list">' +

                    '<i class="icon-tag"></i>';
                $(data.data.data[i].tags).each(function (e, o) {
                    dataStr += '<span ng-repeat="tag in dataA.tags">' + data.data.data[i].tags[e].name + '</span>'
                });
                dataStr += '     </div>' +
                    '<div class="push_info flex-container">' +
                    '<div class="flex-container-left">' +
                    '<div class="answer_img"><img src="images/default.png" alt=""></div>';
                if (!data.data.data[i].nickname) {
                    dataStr += '<span class="user_color username inm ellipsis">' + data.data.data[i].userName + '</span>';
                } else {
                    dataStr += '<span class="user_color username inm ellipsis">' + data.data.data[i].nickname + '</span>';
                }
                dataStr += '<span>' + data.data.data[i].addTime + '</span>' +
                    '</div>' +
                    '<div>关注度：' + data.data.data[i].browse + '<b class="fg_line">|</b>' + data.data.data[i].answerNum + '人回答</div>' +
                    '</div>' +
                    '</div>' +
                    '</a>' +
                    '</li>';
            });
            $('.swiper-wrapper').append(tagStr);
            $('.qa_index').append(dataStr);
            $('.pageSize').append(data.data.pageStr);
            swiper();
        }
    });
    // 分页数据
    $(document).on('click', '.pageSize li.iPage', function () {
        var page = parseInt($(this).html());
        var tagId =$('.swiper-slide-active span').attr('tag-id');
        contentStr(page, tagId)
    });
    //上一页
    $(document).on('click', '.pageSize li.prev', function () {
        var page = parseInt($('.pageSize li.on').html())-1;
        var tagId =$('.swiper-slide-active span').attr('tag-id');
        contentStr(page, tagId)


    });
    //下一页
    $(document).on('click', '.pageSize li.next', function () {
        var page = parseInt($('.pageSize li.on').html())+1;
        var tagId =$('.swiper-slide-active span').attr('tag-id');
        contentStr(page, tagId)
    });

});
// 导航滑动
function swiper() {
    var mySwiper = new Swiper('#topNav', {
        freeMode: true,
        freeModeMomentumRatio: 0.5,
        slidesPerView: 'auto',
        onTap: function(swiper,e){
            slide = swiper.slides[swiper.clickedIndex];
            slideLeft = slide.offsetLeft;
            slideWidth = slide.clientWidth;
            slideCenter = slideLeft + slideWidth / 2;
            // 被点击slide的中心点

            mySwiper.setWrapperTransition(300);

            if (slideCenter < swiperWidth / 2) {

                mySwiper.setWrapperTranslate(0)

            } else if (slideCenter > maxWidth) {
                mySwiper.setWrapperTranslate(maxTranslate)

            } else {
                nowTlanslate = slideCenter - swiperWidth / 2;
                mySwiper.setWrapperTranslate(-nowTlanslate)
            }

            $("#topNav  .active").removeClass('active');
            $("#topNav .swiper-slide").eq(swiper.clickedIndex).addClass('active');
        },
        onClick:function (e,k) {
            var _this=new Object(k.path[0]);
            var tagId=$(_this).attr('tag-id');
            contentStr(1,tagId);

        }
    });
    swiperWidth = mySwiper.container[0].clientWidth;
    maxTranslate = mySwiper.maxTranslate();
    maxWidth = -maxTranslate + swiperWidth / 2;
}
// 字符串拼接
function contentStr(page,tagId) {
    $.ajax({
        type: 'post',
        url: httpUrl + '/cn/wap-api/question',
        data: {
            tag: tagId,
            page: page,
            pageSize: 20
        },
        dataType: 'json',
        success: function (data) {
            var tagStr = '<div class="swiper-slide active"><span>全部</span></div>';
            var dataStr = '';
            $('.pageSize').empty();
            $('.qa_index').empty();
            $(data.tags).each(function (a, b) {
                tagStr += '<div class="swiper-slide" tag-id="' + data.tags[a].id + '"><span tag-id="' + data.tags[a].id + '">' + data.tags[a].name + '</span></div>'
            });
            $(data.data.data).each(function (i, j) {
                dataStr += '<li>' +
                    '<a href="fq_details.html?id=' + data.data.data[i].id + '">' +
                    '<div>' +
                    '<h1 class="ques_name">' + data.data.data[i].question + '</h1>' +
                    '<p class="ques_de">' + data.data.data[i].content + '</p>' +
                    '<div class="tag_list">' +

                    '<i class="icon-tag"></i>';
                $(data.data.data[i].tags).each(function (e, o) {
                    dataStr += '<span ng-repeat="tag in dataA.tags">' + data.data.data[i].tags[e].name + '</span>'
                });
                dataStr += '     </div>' +
                    '<div class="push_info flex-container">' +
                    '<div class="flex-container-left">' +
                    '<div class="answer_img"><img src="images/default.png" alt=""></div>';
                if (!data.data.data[i].nickname) {
                    dataStr += '<span class="user_color username inm ellipsis">' + data.data.data[i].userName + '</span>';
                } else {
                    dataStr += '<span class="user_color username inm ellipsis">' + data.data.data[i].nickname + '</span>';
                }
                dataStr += '<span>' + data.data.data[i].addTime + '</span>' +
                    '</div>' +
                    '<div>关注度：' + data.data.data[i].browse + '<b class="fg_line">|</b>' + data.data.data[i].answerNum + '人回答</div>' +
                    '</div>' +
                    '</div>' +
                    '</a>' +
                    '</li>';
            });
            $('.pageSize').append(data.data.pageStr);
            $('.qa_index').append(dataStr);
        }
    });
}
