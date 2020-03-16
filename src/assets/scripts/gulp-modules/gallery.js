
var allCarousels = $('.gallery__in.active');
var slidesRow       = allCarousels.find('.slides-row');
console.log(slidesRow)
    slidesRow.slick({
      arrows: false,
      dots: true,
      infinite: false,
      appendDots: '.gallery__in .slide-controls',
   });
    $('.arrow-prev').click(function () {
    	// $('.slides-row').slick('slickPrev');
      $(this).closest('.slide-controls').siblings('.slides-row').slick('slickPrev');
    })
    $('.arrow-next').click(function () {
    	// $('.slides-row').slick('slickNext');
      $(this).closest('.slide-controls').siblings('.slides-row').slick('slickNext');
    });
    // FILTR OBJECTS
    const objFilterBtn = $('.js-obj-filter');
    const objItems = $('.js-obj-items');
    
    objFilterBtn.on('click',function (e){
      // console.log($(this).html())
      $('.js-drop-back').html($(this).html());
      const cat = $(this).attr('data-filter');
      objFilterBtn.removeClass('active');
      $(this).addClass('active');
      slidesRow.slick('unslick');
      objItems.removeClass('active');
      filterObj(cat);
    });

    function filterObj(categoty){
      objItems.each(function(i,el) {
        let param = $(el).attr('data-param');
        if (param == categoty) {
          $(el).addClass('active');
          console.log($(el))
          $(el).find('.slides-row').slick({
            arrows: false,
            dots: true,
            infinite: false,
            appendDots: '.gallery__in.active .slide-controls',
         });
        $('.arrow-prev').click(function () {
          // $('.slides-row').slick('slickPrev');
          $(this).closest('.slide-controls').siblings('.slides-row').slick('slickPrev');
        })
        $('.arrow-next').click(function () {
          // $('.slides-row').slick('slickNext');
          $(this).closest('.slide-controls').siblings('.slides-row').slick('slickNext');
        });
        }
      });    
    }

    filterObj()

  $('.js-drop-back').click(function() {
    var _this = $(this);
    var parent = _this.parents('.drop');
    var wrap =  parent.find('.js-drop');
    var heightWrap = wrap.data('drop-height');
    var heightInner = parent.find('.drop__inner').height();
   // $(this).html(objFilterBtn)
    console.log(heightWrap, heightInner);
    if ( _this.hasClass('open') ) {
      wrap.height(heightWrap);
      $('.js-drop-icon').removeClass('open');
      $('.info-close').removeClass('open');
      _this.removeClass('open');
    }else {
      $('.js-drop-back').removeClass('open');
      $('.js-drop-icon').addClass('open');
      $('.info-close').addClass('open');
      _this.addClass('open');
      wrap.height(heightInner);
    }
  });