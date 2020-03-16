$('.js-gallery-project').slick({
     slidesToShow: 2,
     slidesToScroll: 1,
     dots: false,
     infinite: true,
     arrows: false,
     responsive: [
       {
         breakpoint: 1200,
         settings: {
           slidesToShow: 1,
           slidesToScroll: 1
         }
       }
     ]
   });


 $('.gallery-project__btn-prev').on('click', function(){
    $('.js-gallery-project').slick('slickPrev');
  });

  $('.gallery-project__btn-next').on('click', function(){
    $('.js-gallery-project').slick('slickNext');
  });

  $('.js-gallery-project').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
     $('.project__counter').html(`${currentSlide+1}` + `<span></span>` +`${document.querySelectorAll('.js-gallery-project .slick-slide:not(.slick-cloned)').length}`);
  });
