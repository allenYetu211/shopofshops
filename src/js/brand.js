
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
    waterfall () {

        $('.waterfall').masonry({
            itemSelector: '.waterfall-items',
            gutterWidth: 10
        });
    },
    showToggle (_t) {
        let getTop = _t.parent().offset().top;

        $('html,body').animate({scrollTop: getTop}, 100);
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
    barcode () {
        $('.mobile-barcode').toggleClass('open');
    },
    languageTooke (_t) {
        $('.language-mobile a').removeClass('active');
        _t.addClass('active');
    },
    mobilenav (_t) {
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


    transformLogo (_count) {
        $('.footer-shoplogo li').css({
            'transform': 'translateX(-' + _count * 100 + '%)'
        });
    },


    introduce () {
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

$('.waterfall-next').on('click', function () {
    sliding.getActionsNext($(this));
});

$('.waterfall-prev').on('click', function () {
    sliding.getActionsPrev($(this));
});


var sliding = {
    showState: '',
    filgsNext: true,
    filgsPrev: true,


    getActionsNext (_t) {
        let _transformsNext = _t.parent().siblings('.water-parent');

        if (_transformsNext.find('.item:last').hasClass('active')) {
        console.log(111)
            return
        } else {
            _transformsNext.find('.carousel').carousel('next')
        }


        if (this.filgsNext) {
            if (_transformsNext.find('.item').eq(_transformsNext.find('.item').length - 2).hasClass('active')) {
                _t.find('img:last').addClass('shows');
                this.filgsNext = false
            }
         }
        this.filgsPrev = true
        _t.siblings('.waterfall-prev').find('img:last').removeClass('shows');
    },


    getActionsPrev (_t) {
        let _transformsNext = _t.parent().siblings('.water-parent');
        console.log(_transformsNext.find('.item:first'))
        if (_transformsNext.find('.item:first').hasClass('active')) {
        console.log(222)
            return
        } else {
            _transformsNext.find('.carousel').carousel('prev');
        }


        if (this.filgsPrev) {
            if (_transformsNext.find('.item').eq(1).hasClass('active')) {
                _t.find('img:last').addClass('shows');
                this.filgsPrev = false
            }
         }
         this.filgsNext = true
         _t.siblings('.waterfall-next').find('img:last').removeClass('shows');
    },


    showIntroduce (_t) {
        $('html,body').animate({scrollTop: $('.brands-items').offset().top}, 200);
        $('.waterfall-arrow').css('opacity', 1);
        $('.waterfall-close').css('opacity', 1);
        this.showState = _t.index();
        _t.parents('.waterfall').siblings('.waterfall-popup').find('.carousel').carousel(_t.index());
        _t.parents('.waterfall').siblings('.waterfall-popup').show().end().hide();
    },


    close (_t) {
        _t.parents('.waterfall-popup').prev().fadeIn().end().fadeOut();
         if (this.showState > _t.parent().prev().children().length - 2) {
            return;
        }
        this.showState++;
        _t.parent().prev().children().css({
            'transform': 'translateX(-' + this.showState * 100 + '%)',
            'transition': 'transform 0.2s'
        });
    },


    prev (_t) {
        if (-this.showState >= 0) {
            return;
        };

        this.showState--;
        _t.parent().prev().children().css({
            'transform': 'translateX(-' + this.showState * 100 + '%)',
            'transition': 'transform 0.2s'
        });

    },


    animations (_t) {
        _t.parent().next().find('.water-parent').children().css('transform', 'translateX(-' + this.showState * 100 + '%)');
    }
};

$("#carousel-rop-6, #carousel-rop-5, #carousel-rop-4, #carousel-rop-3, #carousel-rop-2, #carousel-rop-1").carousel({
    interval: 0,
    pause: false,
    toggle: false
});
