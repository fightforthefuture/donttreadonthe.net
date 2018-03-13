(function($){
	"use strict";

	function fixFormPosition() {
		var $copy = $('.section-head .copy');
		var leftPosition = $copy.offset().left + $copy.width() + 20;
		$('.form-container').css('left', leftPosition);
	}

	function openPopup(url, title, w, h) {
		if (!title) {
			title = 'popup';
		}
		if (!w) {
			w = 600;
		}
		if (!h) {
			h = 500;
		}
		// Fixes dual-screen position
		var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
		var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

		var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
		var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

		var left = ((width / 2) - (w / 2)) + dualScreenLeft;
		var top = ((height / 2) - (h / 2)) + dualScreenTop;
		var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

		// Puts focus on the newWindow
		if (window.focus) {
			newWindow.focus();
		}
	}

	$(function() {
		fixFormPosition();
		$(window).resize(fixFormPosition);

		$('#fftf-form').submit(function(e){
			e.preventDefault();

			var $form = $(this);
			var $error = $form.find('.form-error');
			var $button = $form.find('.btn');
			var params = $form.serialize();

			var buttonText = $button.text();
			$button.text('Loading...').attr('disabled', 'disabled');
			$error.hide();

			$.post($form.attr('action'), params, function(response){
				$button.text(buttonText).removeAttr('disabled');

				if (response.data) {
					$('.form-active, .form-complete').toggleClass('hidden');
				}
				else {
					$error.show();
				}
			});
		});

		$('.btn-facebook').click(function(e){
			e.preventDefault();
			openPopup('http://shpg.org/103/186643/facebook', 'facebook');
		});

		$('.btn-twitter').click(function(e){
			e.preventDefault();
			openPopup('http://shpg.org/103/186645/twitter', 'twitter');
		});
	});
}(jQuery));
