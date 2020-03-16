/**Build construction progress bars setup */
   let barsList = document.querySelectorAll('.build-status__progress-bar') || undefined;
   barsList.forEach(item => {
       let completeBar = item.querySelector('.build-status__progress-bar-completed');
       console.log(completeBar.style.width)
       completeBar.style.width = completeBar.dataset.width;
       item.parentNode.querySelector(`.${item.parentNode.className}__value`).innerHTML = completeBar.dataset.width;
   });
   /**Build construction slider */
   var year = $('.js-year.is-active').data('year-value');
   var month = $('.js-month.is-active').data('month-value');

   $(document).on('click', '#year', function(event) {
     $('.js-year').removeClass('is-active');
     var target = $( event.target );
     target.addClass('is-active');
     year = target.data('year-value');
     newNews();
   });

   $(document).on('click', '#month', function(event) {
    var target = $( event.target );
    if($(target).hasClass('js-deactive')) { 
       return;
    } else {
       $('.js-month').removeClass('is-active');
       target.addClass('is-active');
       month = target.data('month-value');
       newNews();
      }
   });


     //new mobile
   let selectBlock = document.querySelector('.custom-select-wrap'),
           options = document.querySelectorAll('.custom-option'),
           selected = selectBlock.querySelector('.custom-select'),
           $selectsList = document.querySelectorAll('.custom-select-wrap'),
           yearSelect = document.querySelector('.year-js');
           monthSelect = document.querySelector('.month-js');
           monthSelect.querySelectorAll('.custom-option').forEach(el => {
           el.onclick = function() {
               monthSelect.querySelector('.custom-select').innerText = this.innerHTML;
               monthSelect.querySelector('.custom-select').dataset.monthValue = this.dataset.monthValue;
           }
       });
   options.forEach(el => {
        el.addEventListener('click', function() {
            month = document.querySelector('.month-js').querySelector('.custom-select').dataset.monthValue; /**Текущее значение месяца */
            newNews();
        });
    });
    //new mobile



   function newNews (){
    data = $('.photogallery__item');
    var n=0;
      for(i=0; i<data.length; i++){
         if( (data[i].dataset.month == month ) && data[i].dataset.year == year){
           $(data[i]).addClass('is-active');
           // console.log($(data[i]).find('.js-slider-gallery'));
           // console.log($(data[i]).find('.js-slider-gallery').slick)
           // console.log($($(data[i]).find('.js-slider-gallery')).slickCurrentSlide)

            // $('.gallery__counter').html(`${$(data[i]).find('.js-slider-gallery').slick.slickCurrentSlide()}/${ $(data[i]).find('.slick-slide:not(.slick-cloned)').length}`);

           // $('.gallery__counter').html(`1/${document.querySelectorAll('.js-slider-gallery .slick-slide:not(.slick-cloned)').length}`);
         } else {
           $(data[i]).removeClass('is-active');
         }
      }
   };

   $('.js-slider-gallery').on('init', function(slick) {
     // console.log('init');
     // console.log(this);
      // console.log($(this).find('.slick-slide:not(.slick-cloned)').length );
          // console.log($(this).find('.gallery__counter') );
          $(this).siblings('.gallery__counter').html(`1/${$(this).find('.slick-slide:not(.slick-cloned)').length }`);
      });
   // slider-gallery
   $('.js-slider-gallery').slick({
     // centerMode: true,
     // centerPadding: "250px",
     slidesToShow: 1,
     
     // dots: true,
     arrows: false,
     // variableWidth: true,
     // asNavFor: '.slider-nav',
     // prevArrow: '<div class="gallery-genplan__btn-prev"><div class="js-gallery-prev slider-arrow slider-arrow_left slider-arrow_pink"><div class="slider-arrow__icon"><svg class="svg-icon"><use xlink:href="#icon-arrow"></use></svg></div></div></div>',
     // nextArrow: '<div class="gallery-genplan__btn-next"><div class="js-gallery-next slider-arrow slider-arrow_right slider-arrow_pink"><div class="slider-arrow__icon"><svg class="svg-icon"><use xlink:href="#icon-arrow"></use></svg></div></div></div>',
     // customPaging : function(slider, i) {
     //     var title = $(slider.$slides[i]).attr('data-title');
     //     return '<a class="slider__item"> '+title+' </a>';
     //   }
     responsive: [
         {
           breakpoint: 767,
           settings: {
             centerPadding: "10px",
           }
         }
       ]
     });
     // $('.slider-nav').slick({
     //   centerMode: true,
     //   slidesToShow: 1,
     //   fade: true,
     //   asNavFor: '.slider-for',
     //   arrows: false,
     //   responsive: [
     //       {
     //         breakpoint: 767,
     //         settings: {
     //           centerPadding: "5px",
     //         }
     //       }
     //     ]
     // });
   $('.js-gallery-prev').click(function () {
      $(this).closest('.photogallery__slider').find('.js-slider-gallery').slick('slickPrev')
       // $('.js-slider-gallery').slick('slickPrev');
   })

   $('.js-gallery-next').click(function () {
     $(this).closest('.photogallery__slider').find('.js-slider-gallery').slick('slickNext')
     // $('.js-slider-gallery').slick('slickNext');
   });
   
   $('.js-slider-gallery').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
              $(this).siblings('.gallery__counter').html(`${nextSlide+1}/${$(this).find('.slick-slide:not(.slick-cloned)').length }`);
          // $('.gallery__counter').html(`${nextSlide+1}/${document.querySelectorAll('.is-active .js-slider-gallery .slick-slide:not(.slick-cloned)').length}`);
        console.log(109,nextSlide)
      });
    
   $('.slider-gallery__item').magnificPopup({
     type: 'image'
   });

   