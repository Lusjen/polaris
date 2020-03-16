(function($) {

var hoverFloor = function() {
	if($(window).width() > 768){

	var currentMousePos = { x: -1, y: -1 };
	  $(".js-choise-apartment-img").mousemove(function(event) {
		currentMousePos.x = event.offsetX;
        currentMousePos.y = event.offsetY;

	  });

	 $('.js-link').mousemove(function(){
	   var divInfoLeftPos = currentMousePos.x  - 96;
	   var divInfoTopPos = currentMousePos.y - 150;

	   $('.js-choise-img').css({left:divInfoLeftPos});
	   $('.js-choise-img').css({top:divInfoTopPos});

	   var type = this.dataset.type
	   var rooms = this.dataset.flats;
	   var square = this.dataset.square;
	   var livsquare = this.dataset.livsquare;
	   var number = this.dataset.number;
	   $('.js-type').html(type);
	   $('.choise-apartment__rooms').html(rooms);
	   $('.choise-apartment__floor').html(number);
	   $('.choise-apartment__square').html(square);
	   $('.choise-apartment__livsquare').html(livsquare);

	 });
	}


	  $('.js-link').mouseover(function(){
	    if($(window).width() > 768)
	    {
	      $('.js-choise-img').css( {visibility:'visible'});
	      $('.js-choise-img').css( {display:'block'});
	    }
	     });
	 $('.js-link').mouseout(function(){
	   if($(window).width() > 768)
	     {
	     $('.js-choise-img').css( {visibility:'hidden'});
	     $('.js-choise-img').css( {display:'none'});
	   }
	});
};

(function hpInitFloor() {
			hoverFloor();
	 })();

})(jQuery);