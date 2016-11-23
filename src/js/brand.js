  $(window).on('load', function() {
    if($('.waterfall').length != 0) {
      $('.waterfall').masonry({
          itemSelector: '.waterfall-items',
          columnWidth: 200
      });
      $('.waterfall').eq(0).nextAll().hide();
    }
  shopLogo.init()
  })
  $('.brands-items li').on('click', function() {
      toggle.showToggle($(this));
  });
  $('.js_shoplogo_perv').off().on('click',function() {
    if(shopLogo.transformIndex <= 0){
      return
    }
    shopLogo.transformIndex--;
    // console.log('less:',_count)
    shopLogo.transformLogo(shopLogo.transformIndex);
  })

  $('.js_shoplogo_next').off().on('click',function() {
    if(shopLogo.transformIndex >= $('.footer-shoplogo li').length - 6){
      return
    }
    shopLogo.transformIndex++;
    // console.log('add:',_count)
    shopLogo.transformLogo(shopLogo.transformIndex);
  })

  var toggle = {
      showToggle(_t) {
          // waterfall.init();
          // console.log($('.waterfall[data]'))
          $('.brands-items li').removeClass('active');
          _t.addClass('active');
          $('.waterfall').each(function() {
              if ($(this).data('sw') === _t.data('pois')) {
                  $('.waterfall').hide();
                  $(this).show();

              }
          })
      }
  }
  var shopLogo = {
    transformIndex: 1,
    init() {
      let maxWidth = 0;
      $('.footer-shoplogo li').each(function () {
        maxWidth += $(this).innerWidth()
      })
      $('.footer-shoplogo ul').css('width', maxWidth);
    },
    transformLogo(_count) {
      // console.log(_count)
      $('.footer-shoplogo li').css({
        'transform': 'translateX(-' + _count * 100 + '%)'
      })
    }
  }
