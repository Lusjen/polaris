(function ($) {
	// TABS
	var tabsHeader = $('.js-btn'),
		tabsContent = $('.js-list');
	tabsHeader.on('click', function () {
		var data = $(this).data('year');
		tabsContent.removeClass('is-active');
		tabsContent.eq(data).addClass('is-active');
		tabsHeader.removeClass('is-active_wc');
		$(this).addClass('is-active_wc');
	});
})(jQuery);