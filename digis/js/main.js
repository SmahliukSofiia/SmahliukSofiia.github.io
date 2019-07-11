$(document).ready(function () {
    $('.carousel').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear', 
        arrows: true
    });
});

function range() {
    var val = $('.range').val();
    $('.range').css({ 'background': '-webkit-linear-gradient(left, #53b3b2 0%, #53b3b2 ' + val + '%, #eeeeee ' + val + '%, #eeeeee 100%)' });
}
(function () {
    var thumb = $(".thumbD"), track = $(".track"), line = $(".line");
    thumb.on("mousedown", function (e) {
        var
            thumbL = $(".thumbL").offset().left,
            thumbR = $(".thumbR").offset().left,
            trackCor = track.offset().left,
            curShiftL = e.pageX - thumbL,
            curShiftR = $(".thumbR").outerWidth() - (e.pageX - thumbR);

        $(this).addClass("drag2");
        $(document).mousemove(function (e) {
            var posL = e.pageX - trackCor - curShiftL;
            var posR = ((trackCor + track.width()) - e.pageX) - curShiftR;

            if ($(".drag2").hasClass("thumbL")) {
                if (posL < 0) { posL = 0 };
                if (posL > thumbR - trackCor - 11) { posL = thumbR - trackCor - 11; };
                $(".drag2").css({ "left": posL + 'px' });
                $(".line").css({ "left": posL + 'px' });
            }

            else if ($(".drag2").hasClass("thumbR")) {
                if (posR < 0) { posR = 0 };
                if (posR > (trackCor + track.width()) - thumbL - 22) {
                    posR = (trackCor + track.width()) - thumbL - 22;
                };
                $(".drag2").css({ "right": posR + 'px' });
                $(".line").css({ "right": posR + 'px' });
            }
        }).on("mouseup", function () { thumb.removeClass("drag2"); });
        return false;
    });
})();