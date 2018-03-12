(function($){
	"use strict";

	function bindForm($el, onSuccess) {
		$el.submit(function(evt){
			evt.preventDefault();
			
			var params = $el.serialize();
			var $error = $(".form-error");
			var $success = $(".form-success");
			var $button = $el.find('button');
			
			$error.hide();
			$success.hide();
			$("input", $el).attr("disabled", "disabled");

			$.post($el.attr('action'), params, function(response) {
				if (response.data) {
					if (onSuccess) {
						onSuccess();
					} else {
						$success.show();
					}
				}
				else {
					$error.show();
				}
				$("input", $el).removeAttr('disabled');
			});
		});
	}

	function fixFormPosition() {
		var $copy = $('.section-head .copy');
		var leftPosition = $copy.offset().left + $copy.width() + 20;
		$('.form-container').css('left', leftPosition);
	}

	$(function() {
		bindForm($("#fftf-form"));
		fixFormPosition();
		$(window).resize(fixFormPosition);
	});
}(jQuery));
