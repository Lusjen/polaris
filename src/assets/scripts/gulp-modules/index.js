@@include('./libs.js');

(function ($) {
	var loader = function () {
		$(".loader-wrap").delay(1500).fadeOut(500);
	};
	loader()


const wow = new WOW({
	boxClass: 'wow',
	animateClass: 'animated',
	offset: 0,
	live: true
});
wow.init();



// VALIDATION FORM

$('.main-form__input').on('focus', function () {
	$(this).parent().addClass('js-input-focus');
}).blur(function () {
	if ($(this).val() === '') {
		$(this).parent().removeClass('js-input-focus');
	}
});

$('#js-call-form').on('submit', function (e) {
	event.preventDefault();
	var parent = e.target;
	ajax_form(parent);
});

		function ajax_form(e) {
			event.preventDefault();
			var err = [];
			let serverAnsver = {};
			var rulesPattern = {
				email: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
				tel: /^\+38\(\d{3}\)\d{7}$/
			};
			var validatorMethods = {
				empty: function (el) {
					return (el === '') ? true : false;
				},
				pattern: function (el, pattern) {
					return pattern.test(el);
				},
				contains: function (el1, el2) {
					return (el1 == el2) ? false : true;
				},
				check: function (el) {
					return (el.checked) ? false : true;
				},
				max: function (el) {
					return (el.length > 5) ? true : false;
				}
			}
			var removeAnimationClass = function (selector, classAnimation) {
				selector.addClass(classAnimation);
				selector.on("animationend", function () {
					selector.removeClass(classAnimation);
				});
			}
			var pushError = function (key) {
				err.push(key);
			}
			var showError = function (key) {
				var errorMessage = $(this).next().data("errormessage"); // добавляем в input сообщение об ошибке из dataAttr и class
				var inputText = $(this).next().find('.main-form__text');
				($(this).closest('.main-form-block').hasClass('js-input-focus')) ? removeAnimationClass(inputText, 'shake-focus'): removeAnimationClass(inputText, 'shake')

				inputText.text(errorMessage);
				$(this).addClass('js-no-valid');
				pushError(key)
			}
			var showDefaultMessage = function () {
				var defaultMessage = $(this).next().data("defaultmessage"); // при клике на input убираем сообщение и class
				$(this).next().find('.main-form__text').text(defaultMessage);

				$(this).removeClass('js-no-valid');
			}
			var str = $("#" + e.id).serialize();
			//var x = document.forms[e.id]["name"].value;
			//var y = document.forms[e.id]["tel"].value;
			//	console.log(str);


			var errors = true; // по умолчанию ошибок в форме нет
			$(e).find('.main-form__input-requaired').each(function () {
				var rule = $(this).data("rule").split(' ');
				if ($(this).data("patterns") != undefined) {
					var pattern = $(this).data("patterns").split(' ');
				}
				if ($(this).data("compare") != undefined) {
					var compare = $(this).data("compare").split(' ');
				}

				rule.forEach((el) => {


					switch (el) {
						case 'pattern':
							pattern.forEach((elPat) => {
								errors = !validatorMethods[el]($.trim($(this).val()), rulesPattern[elPat]);
								if (errors) showError.call($(this), elPat);
							});
							break;
						case 'contains':
							var compareElemOne = $('#' + compare[0]).val();
							var compareElemTwo = $('#' + compare[1]).val();
							errors = validatorMethods[el](compareElemOne, compareElemTwo);
							if (errors) showError.call($(this), el);
							break;
						case 'check':
							errors = validatorMethods[el]($(this)[0]);
							if (errors) showError.call($(this), el);
							break;
						default:
							errors = validatorMethods[el]($.trim($(this).val()));
							if (errors) showError.call($(this), el);
					}
				})

				$(".main-form__input").on("mouseup", showDefaultMessage);

			});
			if (err.length == 0) {
				get(str, "./static/val.php", true, (data) => {
					serverAnsver = data.error;
					for (let key in serverAnsver) {
						showErrorMessage.call(e, key, serverAnsver[key])
					};

					if (serverAnsver.length == 0) {
						get(str, "./static/val.php", true, () => {
							$.ajax({
									method: "POST",
									url: "./static/val.php",
									data: str,
									beforeSend: function () {
										$(e).find('button.js-main-form__button').text('Отправка...') // замена текста в кнопке при отправке
										$('body').css('cursor', 'wait')
									},
									error: function () {
										$(e).find('button.js-main-form__button').text('Ошибка отправки!'); // замена текста в кнопке при отправке в случае
									}
								})
								.done(function (msg) {
									$('.form-succses').addClass('form-succses-active');
									$(e).find('.main-form__input-requaired').each(function (el) {
										$(this).val('');
										showDefaultMessage.call($(this));
									});
									$(e).find('.main-form-block.requaired').removeClass('js-input-focus');
									$('body').css('cursor', 'default');
									//location.replace('/message/');
									$(e).find('button.js-main-form__button').text('Отправить');
								});
						});
					}
				});

			}

			function showErrorMessage(elem, text) {
				const element = $(this).find(`[data-type="${elem}"] .main-form__text`);
				const inp = element.closest('.requaired').find('.main-form__input-requaired');
				inp.addClass('js-no-valid');
				removeAnimationClass(element, 'shake-focus')
				element.text(text);
			}
		}


		function get(sand, url, parse, callback) {
			$.ajax({
				url: url,
				type: 'get',
				data: sand,
				global: false,
				async: true,
				success: function (data) {
					var data = (parse) ? JSON.parse(data) : data
					callback(data)
				},
				error: function (jqXHR, status, errorThrown) {
					console.log('ОШИБКА AJAX запроса: ' + status, jqXHR);
				}
			});
		}
		// DATA INPUT


		$.datetimepicker.setLocale('ru');
		var logic1 = function (currentDateTime) {
			if (currentDateTime.getDate() == new Date().getDate()) {
				this.setOptions({
					minTime: new Date()
				});
			} else {
				this.setOptions({
					minTime: '9:00'
				});
			}
		};
		$('.js-datetimepicker_dark').datetimepicker({
			//            theme:'dark',
			// value: 'trololo',
			// value: new Date(),
			minDate: new Date(),
			maxTime: '20:00',
			yearStart: 2019,
			yearEnd: 2019,
			dayOfWeekStart: 1,
			onSelectDate: logic1,
			onShow: logic1

		});

			//SCROLL BTN 
			const scrollBtn = $('.js-scroll-tip');
			scrollBtn.on('click', function (e) {
				let heightParrent = $(this).closest('.main-screen').height();
				let heightHeader = $('.header').height();
				console.log(heightParrent);
				$('html, body').animate({
					scrollTop: heightParrent - heightHeader
				}, 1500);
			});

			// POPUP FORMS

			function initPopup(elem) {
				$(elem).magnificPopup({
					type: 'inline',
					preloader: false,
					removalDelay: 500,
					callbacks: {
						open: function () {
							$('.js-close-btn').on('click', function (event) {
								event.preventDefault();
								$.magnificPopup.close();
							});
						},
						beforeOpen: function () {
							this.st.mainClass = this.st.el.attr('data-effect');
						}
					},
					midClick: true
				});
			}

			initPopup('.js-call-form-popup');
			initPopup('.js-price-btn');

					// MENU
			var menuWrap = $('.js-menu'),
				menuBtn = $('.js-menu-btn'),
				closeMenuBtn = $('.js-close-btn'),
				logoMenu = $('.logo-menu'),
				body = $('body');

			menuBtn.on('click', function () {
				menuWrap.removeClass('visible--hidden');
				$(this).addClass('visible--hidden');
				body.addClass('overflow--hidden');
				menuWrap.addClass('menu-bg-anim');
				logoMenu.addClass('flipInY');
			});
			closeMenuBtn.on('click', function () {
				menuWrap.addClass('visible--hidden');
				menuBtn.removeClass('visible--hidden');
				body.removeClass('overflow--hidden');
				menuWrap.removeClass('menu-bg-anim');
				logoMenu.removeClass('flipInY');
			});

			// var titleMenu = $('.menu-main-list__link');
			// 		titleMenu.addClass('animated fadeInUp wow');
			// 		var a = 0.0;
			// 		titleMenu.each(function (indx, element) {
			// 			$(element).css({
			// 				'animation-delay': (a + indx * 1 / 10) + 's'
			// 			});
			// 		});

			//menu
			$(".menu-btn").click(function() {
					$('.js-menu').addClass('visible-hidden');
					// $('.line').addClass('open');
					$('body').addClass('overflow');
					$('.menu-list').addClass('overflow-scroll');
					$('.header__call').addClass('is-hidden');
					$('.header__tel').addClass('is-hidden');
					$('.menu__img path').addClass('path');
			});
			$(".js-close").click(function() {
					$('.js-menu').removeClass('visible-hidden');
					// $('.line').removeClass('open');
					$('body').removeClass('overflow');
					$('.menu-list').addClass('overflow-scroll');
					$('.header__call').removeClass('is-hidden');
					$('.header__tel').removeClass('is-hidden');
					$('.menu__img path').removeClass('path');
			});
			// var path = document.querySelector('.path');
			// var length = path.getTotalLength();
			// console.log(length);
			$(window).scroll(function(){
				var h = $(window).height();
				$('.icon--line-title').each(function(){
		            windowTop = $(window).scrollTop() - 455;
		            elTop = $(this).offset().top;
		            if((elTop - h) <= windowTop){
		              $(this).addClass('line_active');
		            }
		            if ( (elTop - h) > windowTop) {
		              if ( $(this).hasClass("line_active") ) {
		                $(this).removeClass("line_active");
		              }
		            }
	          	});
	         });

			var a = document.getElementById("logo");
			if (($(window).width() < 1200) && ($(window).width() > 767)) {
			   // a.src = a.src.replace("http://localhost:3000/dist/assets/images/logo.svg","http://localhost:3000/dist/assets/images/logo-tablet.svg");
				a.src = a.dataset.tablet;
			}
			else if ($(window).width() < 767) {
			  // a.src = a.src.replace("http://localhost:3000/dist/assets/images/logo.svg","http://localhost:3000/dist/assets/images/logo-mob.svg");
			  a.src = a.dataset.mob;
			}
			var logoFooter = document.getElementById("logo-footer");
			if (($(window).width() < 1200) && ($(window).width() > 767)) {
			   // logoFooter.src = logoFooter.src.replace("http://localhost:3000/dist/assets/images/logo-footer.svg","http://localhost:3000/dist/assets/images/logo-footer-tablet.svg");
				logoFooter.src = logoFooter.dataset.footerTablet;
			}
			else if ($(window).width() < 767) {
			  // logoFooter.src = logoFooter.src.replace("http://localhost:3000/dist/assets/images/logo-footer.svg","http://localhost:3000/dist/assets/images/logo-footer-mob.svg");
				logoFooter.src = logoFooter.dataset.footerMob;
			}
})(jQuery);