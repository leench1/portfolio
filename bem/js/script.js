(function ($) {
    var hwSlideSpeed = 700;
    var hwTimeOut = 5000;
    var hwNeedLinks = true;

    $(document).ready(function (e) {
        $('.b-slider__slide').css({
            "position": "absolute",
            "top": '0',
            "left": '0'
        }).hide().eq(0).show();
        var slideNum = 0;
        var slideTime;
        slideCount = $(".b-slider .b-slider__slide").size();
        var animSlide = function (arrow) {
            clearTimeout(slideTime);
            $('.b-slider__slide').eq(slideNum).fadeOut(hwSlideSpeed);
            if (arrow == "next") {
                if (slideNum == (slideCount - 1)) {
                    slideNum = 0;
                } else {
                    slideNum++
                }
            } else if (arrow == "prew") {
                if (slideNum == 0) {
                    slideNum = slideCount - 1;
                } else {
                    slideNum -= 1
                }
            } else {
                slideNum = arrow;
            }
            $('.b-slider__slide').eq(slideNum).fadeIn(hwSlideSpeed, rotator);
            $(".control-slide.active").removeClass("active");
            $('.control-slide').eq(slideNum).addClass('active');
        }
        if (hwNeedLinks) {
            var $linkArrow = $('<a id="prewbutton" href="#">&lt;</a><a id="nextbutton" href="#">&gt;</a>')
                .prependTo('.b-slider');
            $('#nextbutton').click(function () {
                animSlide("next");
                return false;
            })
            $('#prewbutton').click(function () {
                animSlide("prew");
                return false;
            })
        }
        var $adderSpan = '';
        $('.b-slider__slide').each(function (index) {
            $adderSpan += '<span class = "control-slide">' + index + '</span>';
        });
        $('<div class ="sli-links">' + $adderSpan + '</div>').appendTo('.b-sliderWrap');
        $(".control-slide:first").addClass("active");
        $('.control-slide').click(function () {
            var goToNum = parseFloat($(this).text());
            animSlide(goToNum);
        });
        var pause = false;
        var rotator = function () {
            if (!pause) {
                slideTime = setTimeout(function () {
                    animSlide('next')
                }, hwTimeOut);
            }
        }
        $('.b-sliderWrap').hover(
            function () {
                clearTimeout(slideTime);
                pause = true;
            },
            function () {
                pause = false;
                rotator();
            });
        rotator();
    });
})(jQuery);
