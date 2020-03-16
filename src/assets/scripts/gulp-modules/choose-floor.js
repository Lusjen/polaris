(function($) {

	var checkFloor = function() {
		//// проблеск по дому
		var floorBox = $('.floor-item-link');
	    var itemLevel = $('.floor-item-link path');
	    var a = 0.0;
	    
	    var floorAnimate = setInterval(function(){
	      
	      for (let i = 0; i < itemLevel.length; i++) {
	        const element = itemLevel[i];
	        element.classList.add('stagger');
	        $(element).css({ 'animation-delay': (a + i * 1 / 10) + 's' });
	        element.addEventListener("animationend", function(){
	          element.classList.remove('stagger');
	        });
	        if (i+1 == itemLevel.length) {
	          clearInterval(floorAnimate);
	          break;
	        }

	      }
	    }, 1000);

			//// функционал при наведении на єтаж

			// $(".floor-item-link").each(function() {

			//   var myBox = $(".info-block-floor");
			//   var infoBox2 = $(".info-block-appartments");
			//   var newlink = $('.floor-item-link');
			//   if ($(window).width() > 768) {

			// 	$(this).mouseenter(function() {
			// 		// $(this).css('opacity','0.8');
			// 	  var level = this.dataset.level;
			// 	  var flatSale = this.dataset.sale;
			// 	  myBox.html(level);
			// 	  infoBox2.html(flatSale);
			// 	});
			// 	$(this).mouseleave(function() {
			// 		// $(this).css('opacity','0');
			// 	});
			//   }
			//   else{

			// 	$(this).click(function(e){
			// 	  var level = this.dataset.level;
			// 	  var flatSale = this.dataset.sale;

			// 	 // console.log(href, $(this).closest('a'));
			// 	  myBox.html(level);
			// 	  infoBox2.html(flatSale);

			// 	});
			// }
			//   var href = this.dataset.href;
			//   $(this).closest('a').attr("href", href);
			//   $(this).closest('a').attr("xlink:href", href);
			// });
		var myBox = $(".info-block-floor");
					  var infoBox2 = $(".info-block-appartments");
					  var newlink = $('.floor-item-link');
		var currentMousePos = { x: -1, y: -1 };
			  // $('.floor-choose__img').mousemove(function(event) {
			  //     currentMousePos.x = event.offsetX;
			  //     currentMousePos.y = event.offsetY;
			  // });

		$('.floor-item-link').mousemove(function(e){
		 	console.log($(this))
		 	var offset = $(this).offset();
		 	var height = $(this).height();
		 	console.log(height);
		 	console.log($(e))
		   // var divInfoLeftPos = currentMousePos.x  - 150;
		   // var divInfoTopPos = currentMousePos.y - 50;
			$('.info-block-floor-choose').offset({top:offset.top, left:((offset.left) - 180)});
		   // $('.info-block-floor-choose').css({left:divInfoLeftPos});
		   // $('.info-block-floor-choose').css({top:divInfoTopPos});
		   var level = this.dataset.level;
			  var flatSale = this.dataset.sale;
			  myBox.html(level);
			  infoBox2.html(flatSale);
		   var key = this.dataset.key;
		   var stock = this.dataset.stock;
		   var floor = this.dataset.floor;
		   var number = this.dataset.number;

		   $('.choise-house__key').html(key);
		   $('.choise-house__house').html(number);
		   $('.choise-house__stock').html(stock);
		   $('.choise-house__floor').html(floor);
		});
	}


	$('.floor-item-link').mouseover(function(){
	    if($(window).width() > 768)
	    {
	      $('.info-block-floor-choose').css( {visibility:'visible'});
	      $('.info-block-floor-choose').css( {opacity:'1'});
	    }
	});
	$('.floor-item-link').mouseout(function(){
	   if($(window).width() > 768)
	     {
	     $('.info-block-floor-choose').css( {visibility:'hidden'});
	     $('.info-block-floor-choose').css( {dopacity:'0'});
	   }
	});


	/* Initialize
	 * ------------------------------------------------------ */
	 (function hpInitchangeFloor() {
			checkFloor();
	 })();

})(jQuery);