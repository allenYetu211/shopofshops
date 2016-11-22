    $(window).on('resize', function () {
     waterfall.init();
  })
  $(window).on('load', function () {
    waterfall.init();
  })
  $('.brands-items li').on('click', function() {
    toggle.showToggle($(this));
  })
  var waterfall = {
    indexlist: '',
    init() {
      let poBox = $('.waterfall-items');
      let pw = $('div[data-sw="1"]').innerWidth();

      let dw = $('.waterfall-items').eq(0).innerWidth();
      let countList = Math.floor(pw / dw);
      let boxHeightList = [];
      for(let i = 0; i < poBox.length; i++) {
        let boxH = poBox.eq(i).innerHeight();
        if (i < countList) {
          poBox.eq(i).attr('style','');
          boxHeightList[i] = boxH;
        } else {
          let minHeight = Math.min.apply(null, boxHeightList);
          let minIndex = $.inArray(minHeight, boxHeightList)
          poBox.eq(i).css({
            'position':'absolute',
            'top':minHeight,
            'left':minIndex * dw
          })
           boxHeightList[minIndex] += poBox.eq(i).innerHeight();
        }

      }
    },
    positions(_count) {
      
    }
  }
  var toggle = {
    showToggle(_t) {
      waterfall.init();
      console.log($('.waterfall[data]'))
      $('.waterfall').each( function () {
        if($(this).data('sw') === _t.data('pois')){
          $('.waterfall').removeClass('open');
          $(this).addClass('open')
        }
      })
    }
  }



