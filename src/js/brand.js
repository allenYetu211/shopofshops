
// $('#carousel-example-generic').hammer().on('swipeleft', function () {

//     $(this).carousel('next');
// });

// $('#carousel-example-generic').hammer().on('swiperight', function () {

//     $(this).carousel('prev');
// });

$(window).on('load', function () {
    if ($('.waterfall').length != 0) {
        toggle.waterfall();
        $('.wf-parents').eq(0).nextAll().find('.waterfall').hide();
        shopLogo.introduce();
    }
    shopLogo.init();
});

$('.subscibe input').on('keyup', function () {
    if ($(this).val().trim() != '') {
        $(this).parent().addClass('action');
        $(this).next().html('搜索');
    } else {
        $(this).parent().removeClass('action');
        $(this).next().html('提交');
    }
});

$('.brands-items li').on('click', function () {
    toggle.showToggle($(this));
});
$('.js_shoplogo_perv').off().on('click', function () {
    if (shopLogo.transformIndex <= 0) {
        return;
    }
    shopLogo.transformIndex--;
    shopLogo.transformLogo(shopLogo.transformIndex);
});

$('.js_shoplogo_next').off().on('click', function () {
    if (shopLogo.transformIndex >= $('.footer-shoplogo li').length - 6) {
        return;
    }
    shopLogo.transformIndex++;
    shopLogo.transformLogo(shopLogo.transformIndex);
});

$('.mobile-nav-more').on('click', function () {
    toggle.mobilenav($(this));
});
$('.language-mobile a').on('click', function () {
    toggle.languageTooke($(this));
});
$('.mobile-informations i, .mobile-barcode').on('click', function () {
    toggle.barcode();
});
$('.barcode').on('click', function (el) {
    el.stopPropagation();
});
var toggle = {
    waterfall: function waterfall() {
        $('.waterfall').masonry({
            itemSelector: '.waterfall-items',
            gutterWidth: 10
        });
    },
    showToggle: function showToggle(_t) {
        $('.brands-items li').removeClass('active');
        _t.addClass('active');
        $('.waterfall').each(function () {
            if ($(this).parent().data('sw') === _t.data('pois')) {
                $('.waterfall').hide();
                $('.waterfall').next().hide();
                $(this).show();
            }
        });
        this.waterfall();
    },
    barcode: function barcode() {
        $('.mobile-barcode').toggleClass('open');
    },
    languageTooke: function languageTooke(_t) {
        $('.language-mobile a').removeClass('active');
        _t.addClass('active');
    },
    mobilenav: function mobilenav(_t) {
        _t.toggleClass('open');
        $('.mobile-nav-information').toggleClass('open');
        $('body').toggleClass('open');
    }
};
var shopLogo = {
    transformIndex: 1,
    init: function init() {
        var maxWidth = 0;
        $('.footer-shoplogo li').each(function () {
            maxWidth += $(this).innerWidth();
        });
        $('.footer-shoplogo ul').css('width', maxWidth);
    },
    transformLogo: function transformLogo(_count) {
        $('.footer-shoplogo li').css({
            'transform': 'translateX(-' + _count * 100 + '%)'
        });
    },
    introduce: function introduce() {
        $('.wf-parents ').find('.waterfall-popup').hide();
    }
};

$('.waterfall-items').on('click', function () {
    sliding.showIntroduce($(this));
});
$('.waterfall-close').on('click', function () {
    sliding.close($(this));
});

$('.waterfall-arrow .waterfall-close').on('click', function () {
    $(this).css('opacity', 0);
});
var sliding = {
    showState: '',
    showIntroduce: function showIntroduce(_t) {
        $('.waterfall-arrow').css('opacity', 1);
        $('.waterfall-close').css('opacity', 1);
        this.showState = _t.index();
        _t.parents('.waterfall').siblings('.waterfall-popup').find('.carousel').carousel(_t.index());
        _t.parents('.waterfall').siblings('.waterfall-popup').show().end().hide();
    },
    close: function close(_t) {
        _t.parents('.waterfall-popup').prev().fadeIn().end().fadeOut();
    },
    next: function next(_t) {
        if (this.showState > _t.parent().prev().children().length - 2) {
            return;
        }
        this.showState++;
        _t.parent().prev().children().css({
            'transform': 'translateX(-' + this.showState * 100 + '%)',
            'transition': 'transform 0.2s'
        });
    },
    prev: function prev(_t) {
        if (-this.showState >= 0) {
            return;
        }
        this.showState--;
        _t.parent().prev().children().css({
            'transform': 'translateX(-' + this.showState * 100 + '%)',
            'transition': 'transform 0.2s'
        });
    },
    animations: function animations(_t) {
        _t.parent().next().find('.water-parent').children().css('transform', 'translateX(-' + this.showState * 100 + '%)');
    }
};
$("#carousel-rop-6, #carousel-rop-5, #carousel-rop-4, #carousel-rop-3, #carousel-rop-2, #carousel-rop-1").carousel({
    interval: 0,
    pause: false
});
