$(() => {
  var waterfall = {
    init() {
    let wf = $('#wf-parents').width();
     if(wf >= 750){
      this.positions(3)
     }else if(wf <=750 && wf > 480){
      this.positions(2)
     }else if(wf <=480){
      this.positions(1)
     }
    },
    positions(_count) {
      
    }
  }
  $(window).on('resize', function () {
     waterfall.init();
  })
  $(window).on('load', function() {
    waterfall.init();
    $('.waterfall-items').each(function () {
           
      })
  })
})