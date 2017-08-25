/**
 * Created by Administrator on 2016/9/6.
 */
var httpUrl = "http://www.smartapply.cn";
var httpUrl2 = "http://schools.smartapply.cn";
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth > 768) {
                docEl.style.fontSize = '20px';
            } else {
                docEl.style.fontSize = 40 * (clientWidth / 750) + 'px';
            }
            //if (!clientWidth) return;
            //docEl.style.fontSize = 40 * (clientWidth / 750) + 'px';
            //console.log(40 * (clientWidth / 750))
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

$(function () {
    $('.nav_icon').click(function (e) {
        e.stopPropagation();
        if ($(this).hasClass("nav_active")) {
            $(this).removeClass("nav_active");
            $('.nav_wrap').stop(true).animate({
                left: "-16.4rem"
            }, 300)
        } else {
            $(this).addClass("nav_active");
            $('.nav_wrap').stop(true).animate({
                left: "0"
            }, 300)
        }
    });
    $(document).click(function (even) {
        var ev = even || window.event;
        var target = ev.target || ev.srcElement;
        var flag = $(target).parents('.nav_wrap').is(".nav_wrap");
        if (!flag) {
            if ($(".nav_icon").hasClass("nav_active")) {
                $('.nav_wrap').stop(true).animate({
                    left: "-16.4rem"
                }, 300);
                $(".nav_icon").removeClass("nav_active");

            }
        }

    });
    $('.nav_list_item_1 li').click(function () {
        $(this).addClass("on").siblings("li").removeClass("on").find('.nav_wrap2').hide();
        $(this).find(".nav_wrap2").slideToggle(300);
    });
    function getDateDiff(dateTimeStamp) {
        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var halfamonth = day * 15;
        var month = day * 30;
        var now = new Date().getTime();
        var diffValue = now - dateTimeStamp;
        if (diffValue < 0) {
            return;
        }
        var monthC = diffValue / month;
        var weekC = diffValue / (7 * day);
        var dayC = diffValue / day;
        var hourC = diffValue / hour;
        var minC = diffValue / minute;
        if (monthC >= 1) {
            result = "" + parseInt(monthC) + "月前";
        }
        else if (weekC >= 1) {
            result = "" + parseInt(weekC) + "周前";
        }
        else if (dayC >= 1) {
            result = "" + parseInt(dayC) + "天前";
        }
        else if (hourC >= 1) {
            result = "" + parseInt(hourC) + "小时前";
        }
        else if (minC >= 1) {
            result = "" + parseInt(minC) + "分钟前";
        } else
            result = "刚刚";
        return result;
    }
});


