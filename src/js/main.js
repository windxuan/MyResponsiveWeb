$(document).ready(function () {
    // 轮播图的配置项
    $(".owl-carousel").owlCarousel({
        items: 1, //单屏显示图片数量
        loop: true, //轮循
        nav: false, //
        autoplay: true, //自动播放
        autoplayTimeout: 5000, //自动播放时间间隔
        autoplayHoverPause: true, //鼠标悬停暂停
    });
});
