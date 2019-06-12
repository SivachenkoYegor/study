$(document).ready(function(){
    $(".header_items a").mPageScroll2id();
});
$(function () {
    $("#back-top").hide();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $("#back-top").fadeIn();
        } else {
            $("#back-top").fadeOut();
        }не
    });
    $("#back-top a").click(function () {
        $("body,html").animate({
            scrollTop: 0
        }, 1200);
        return false;
    });});