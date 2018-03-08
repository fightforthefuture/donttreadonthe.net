(function($){
	"use strict";

	function bindForm($el, onSuccess) {
		$el.submit(function(evt){
			evt.preventDefault();
			
			var params = $el.serialize();
			var $error = $(".form-error");
			var $button = $el.find('button')
			
			$error.hide();
			$("input", $el).attr("disabled", "disabled");

			$.post($el.attr('action'), params, function(response) {
				if (response.data) {
					if (onSuccess) {
						onSuccess();
					}
				}
				else {
					$error.show();
				}
				$("input", $el).removeAttr('disabled');
			});
		});
	}

	$(function() {
		bindForm($("#fftf-form"));
	});
}(jQuery));
