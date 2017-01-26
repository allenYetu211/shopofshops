
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

    if ($('.index_actives_bg').length != 0) {
        initIndexBg.init()
    }

    shopLogo.init();
});


var initIndexBg = {
    initCount: 0,
    stateCount: 0,

    spte () {
        initIndexBg.initCount += 0.5;
        $('.index_actives_bg').css({
            'background-position-x': -initIndexBg.initCount
        }) 
        if (initIndexBg.initCount > initIndexBg.stateCount) {
            initIndexBg.initCount = 0
        }
        requestAnimationFrame(initIndexBg.spte)
    },

    init() {
        initIndexBg.stateCount = $('.index_actives_bg').height() / 450 * 1440
        console.log(initIndexBg.stateCount)
        requestAnimationFrame(initIndexBg.spte)
    }
}


$('.subscibe input').on('keyup', function () {
    if ($(this).val().trim() != '') {
        $(this).parent().addClass('action');
       
    } else {
        $(this).parent().removeClass('action');
        
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

$('.language a').on('click', function () {
    toggle.languages($(this))
})
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
    },

    languages (_t) {
        $('.language a').removeClass('active');
        _t.addClass('active');
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
            return
        } else {
            _transformsNext.find('.carousel').carousel('next')
        }


        if (this.filgsNext) {
            if (_transformsNext.find('.item').eq(_transformsNext.find('.item').length - 2).hasClass('active')) {
                _t.find('img:last').addClass('shows').end().find('img._hover').hide();
                this.filgsNext = false
            }
         }
        this.filgsPrev = true
        _t.siblings('.waterfall-prev').find('img:last').removeClass('shows').end().find('img._hover').show();
    },


    getActionsPrev (_t) {
        let _transformsNext = _t.parent().siblings('.water-parent');
        if (_transformsNext.find('.item:first').hasClass('active')) {
            return
        } else {
            _transformsNext.find('.carousel').carousel('prev');
        }


        if (this.filgsPrev) {
            if (_transformsNext.find('.item').eq(1).hasClass('active')) {
                _t.find('img:last').addClass('shows').end().find('img._hover').hide();
                this.filgsPrev = false
            }
         }
         this.filgsNext = true
         _t.siblings('.waterfall-next').find('img:last').removeClass('shows').end().find('img._hover').show();
    },


    showIntroduce (_t) {
        $('html,body').animate({scrollTop: $('.brands-items').offset().top}, 200);
        $('.waterfall-arrow').css({
        }).addClass('opens')
        this.showState = _t.index();

        let sibliParens = _t.parents('.waterfall').siblings('.waterfall-popup');
        sibliParens.find('.carousel').carousel(_t.index());

        if ($(window).width() > 480) {
            sibliParens.slideDown('400').end().slideUp('400');
        } else {
            sibliParens.show().end().hide();
        }

         sibliParens.find('.waterfall-prev img:last, .waterfall-next img:last').removeClass('shows');

         if (_t.index() === 0) {
            sibliParens.find('.waterfall-prev img:last').addClass('shows').end().find('img._hover').hide();
        } else if (_t.index() === sibliParens.find('.item').length - 1) {
             sibliParens.find('.waterfall-next img:last').addClass('shows').end().find('img._hover').hide();
         }
         if (sibliParens.find('.item').length === 1) {
            sibliParens.find('.waterfall-prev img:last').addClass('shows').end().find('img._hover').hide();
            sibliParens.find('.waterfall-next img:last').addClass('shows').end().find('img._hover').hide();
         }
    },


    close (_t) {
         $('.waterfall-arrow').removeAttr('style').removeClass('opens')
        if ($(window).width() > 480) {
            _t.parents('.waterfall-popup').prev().slideDown('400').end().slideUp('400');
            $('.news-introduce').find('.info').slideDown('400');
            $('.news-introduce').find('.richchigga').slideUp('400');
        } else {
            _t.parents('.waterfall-popup').prev().show().end().hide();
            $('.news-introduce').find('.richchigga').hide().prev().show();
        }
         if (this.showState > _t.parent().prev().children().length - 2) {
            return;
        }
        this.showState++;
        $('.news-next, .news-prev').find('img:last').removeClass('shows');
    },

    // animations (_t) {
    //     _t.parent().next().find('.water-parent').children().css('transform', 'translateX(-' + this.showState * 100 + '%)');
    // }
};

$("#carousel-rop-6, #carousel-rop-5, #carousel-rop-4, #carousel-rop-3, #carousel-rop-2, #carousel-rop-1, #news-information").carousel({
    interval: 0,
    pause: false,
    toggle: false
});

$('.js_moreIntroduce').on('click', function () {
   $('.richchigga').find('.carousel').carousel($(this).parent().index());
   $('.info').slideUp();
   $('.richchigga').slideDown();
   $('html,body').animate({scrollTop: $('.news-introduce').position().top + 5}, 100);
   $('.waterfall-arrow').css('opacity', 1).find('button').show();
   if ($(this).parent().index() === 0) {
    $('.news-prev').find('img:last').addClass('shows');
   } else if ($(this).parent().index() === $(this).parent().siblings().length) {
    $('.news-next').find('img:last').addClass('shows');
   }
})  


$('.news-next').on('click', function () {
        news.newNext($(this))
});

$('.news-prev').on('click', function () {
        news.newPrev($(this))
});

var news = {
    newNext (_t) {
        if ($('#news-information').find('.item:last').hasClass('active')) {
            return
        } else {
            setTimeout(() => {
             if ($('#news-information').find('.item:last').hasClass('active')) {
                    $('.news-next').find('img:last').addClass('shows')       
                }
            }, 800)
            $('#news-information').carousel('next');
            $('.news-prev').find('img:last').removeClass('shows')       
        }
    },
    newPrev (_t) {
        if ($('#news-information').find('.item:first').hasClass('active')) {
            return
        } else {
            setTimeout(() => {
             if ($('#news-information').find('.item:first').hasClass('active')) {
                    $('.news-prev').find('img:last').addClass('shows')       
                }
            }, 800)
            $('#news-information').carousel('prev');
            $('.news-next').find('img:last').removeClass('shows')       
             
        }


    }
};


(function($) {
    var props = ['Width', 'Height'],
        prop;
    while (prop = props.pop()) {
        (function(natural, prop) {
            $.fn[natural] = (natural in new Image()) ?
                function() {
                    return this[0][natural];
                } :
                function() {
                    var
                        node = this[0],
                        img,
                        value;

                    if (node.tagName.toLowerCase() === 'img') {
                        img = new Image();
                        img.src = node.src,
                            value = img[prop];
                    }
                    return value;
                };
        }('natural' + prop, prop.toLowerCase()));
    }
}(jQuery));
$.fn.changeCenter = function(tiparents) {
    $(this).css({
        'position': 'absolute',
        'top': '50%',
        'left': '50%',
        'transform': 'translate(-50%,-50%)'
    })
    tiparents ? tiparents.css('position', 'relative') : ''
    var ww = tiparents ? tiparents.width() : $(window).width()
    var wh = tiparents ? tiparents.height() : $(window).height()
    $(this).each(function() {
        var iw = $(this).naturalWidth()
        var ih = $(this).naturalHeight()
        if (ww > wh) {
            if (iw > ih) {
                var bl = iw / ih
                $(this).css('width', ww)
                $(this).css('height', Math.round(ww * (1 / bl)))
                var newih = Math.round(ww * (1 / bl))
                if (newih < wh) {
                    var bl = ih / iw
                    $(this).css('height', wh)
                    $(this).css('width', Math.round(wh * (1 / bl)))
                }
            } else if (ih == iw) {
                $(this).css({ 'width': ww, 'height': 'auto' })
            } else {
                var bl = ih / iw
                $(this).css('height', wh)
                $(this).css('width', Math.round(wh * (1 / bl)))
            }

        } else {
            if (ih == iw) {
                $(this).css({ 'width': 'auto', 'height': wh })
            } else {
                var bl = ih / iw
                $(this).css('height', wh)
                $(this).css('width', Math.round(wh * (1 / bl)))
            }
        }
    })
}
