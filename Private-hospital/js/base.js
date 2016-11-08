$(function(){
    //banner图
    var swiper = new Swiper('.banner', {
        pagination: '.banner-page',
        paginationClickable: true,
        loop: true
    });

    //机构详情图片滚动展示
    var swiper = new Swiper('.hospitalimg', {
        pagination: '.hospitalimg-page',
        slidesPerView: 3.5,
        paginationClickable: true,
        spaceBetween: 10,
        freeMode: true
    });

    //预约成功后跳转页面
    $(".maskbg a").click(function(){
        $(this).parents(".maskbg").hide();
        setTimeout(function(){window.location="";},500);
    });

    // banner图高度
    $(".banner .swiper-slide").height($(window).width()*0.58);
    $(".banner").height($(window).width()*0.58);
    $(".rightinfo").width($(window).width()*0.904-110);

    //优势专科，名医推荐距离顶部的高度
    var h2=$('header').height()+$('.banner').height()+$('.hospatilmap').height()+$('.reviews').height()+$('.whychoose').height()+45;
    $(".tablist li:first-child").addClass('current');
    $(".tabox-div:first-child").removeClass('hide');
    var tabli = $(".tablist li");
    if(tabli.length>1){
        tabli.css({'width':'50%'});
    }else{
        tabli.css({'width':'100%'});
    }
    //选项卡
    $(".tablist li").click(function(){
        var _index=$(this).index()
        var parenBox=$(this).parent()
        var parenBoxli=parenBox.siblings()
        $(this).addClass("current").siblings().removeClass("current");
        parenBoxli.children().hide();
        parenBoxli.children().eq(_index).show();
        $("html,body").animate({scrollTop:h2+10},500);//1000是ms,也可以用slow代替 
    });

    // 折叠查看更多
    $(".doctorlists li:gt(2)").hide();
    $(".inhospitalist li:gt(5)").hide();
    $(".morebtn").click(function(){
        $(this).toggleClass('active');
        if($(this).hasClass('active')){
            $(this).find('i').html('&#xe604;');
        }else{
            $(this).find('i').html('&#xe603;');
        }
    });
    $(".doc-morebtn").click(function(){
        $(this).parent().prev('ul').find('li:gt(2)').slideToggle(200);
    });
    $(".hos-morebtn").click(function(){
        $(this).parent().prev('ul').find('li:gt(5)').slideToggle(200);
    });
    $(".moreinfo").click(function(){
        $(".hospitalinfo").toggleClass('hospitalinfo-h');
    });

    // 机构详情大图点击隐藏
    $("#imgshow-box").on('click',function(){
        $(this).hide();
        $("#onebox").show();
        $("body,html").css("overflow", "auto");
        $("body").unbind("touchmove");
    });

    //点击弹出图片展示
    $(".hospitalimg a").each(function(){
        $(this).click(function(){
            var index = $(this).index()+1;
            $("#imgshow-box").show();
            // 弹出图片后触发图片可滚动效果
            var swiper = new Swiper('#imgshow-box', {
                pagination: '.imgshow-page',
                paginationClickable: true,
                loop: true,//可选选项，开启循环
                observer:true,//修改swiper自己或子元素时，自动初始化swiper  
                observeParents:true,//修改swiper的父元素时，自动初始化swiper  
                onSlideChangeEnd: function(swiper){  
                    swiper.update();  //图片大图关闭点击小图再弹出的时候更新下面的点
                } 
            });
            swiper.slideTo(index,0);//默认从当前图开始

            $("body,html").css("overflow", "hidden");
            $('body').bind("touchmove",
                function(e) {
                    e.preventDefault();
                });
            });
    });

    $(window).scroll(function(){
        var h=$(this).scrollTop();//获得滚动条距top的高度
        if(h>h2){
            $(".hosdoctor").addClass('pf fixedtop z-in99');
        }else{
            $('.hosdoctor').removeClass('pf fixedtop z-in99')
        }
    });
});