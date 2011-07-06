// jQuery AutoRepeat Plugin
// Easily create auto-repeating form fields
// @author	Kelly Banman
// @site	kellybanman.com
// @created July 5, 2011


(function($) {

	$.autoRepeat = function(element, options) {
		// Avoid scope confusion 
		var plugin = this;

		// Default options
		var defaults = {
			more_text: 'Add Another',
			debug: true,
			instances: 1,
			id: '',
			more_button: false,
			onAdd: function($newset) {
				if (plugin.settings.debug) {
					console.log('Adding new repetition', $newset);
				}
			}
		};

		plugin.settings = {};

		// Cache the jQuerified element
		var $el = $(element);

		// Called when the object is created
		plugin.init = function() {
			// Merge default settings
			plugin.settings = $.extend({}, defaults, options);

			// Give this element a unique id
			$el.data('autoRepeat-id', Math.round(Math.random() * new Date().getTime()));
			console.log($el.data('autoRepeat-id'));

			// Create the more button
			plugin.settings.more_button = $('<div />')
				.addClass('autoRepeat-more_button')
				.insertAfter($el)
				.append($('<button />').text(plugin.settings.more_text))
				.click(function(e) {
					e.preventDefault();
					plugin.repeat();
					return false;
				});

			// Append _1 to the original set
			appendNumber($el, 1);
		}

		// Add a new repetition
		plugin.repeat = function(num) {
			num = (num > 0) ? num : 1;
			for (var i=1; i <= num; i++) {
				var $newset = $el.clone().insertBefore(plugin.settings.more_button);
				appendNumber($newset, ++plugin.settings.instances);
				plugin.settings.onAdd($newset);
			}
			return false;
		}

		var appendNumber = function ($fieldset, num)
		{
			var attributes = ['for', 'name', 'id'];
			$('input, label, select, textarea', $fieldset).each(function(index, el) {
				var $el = $(el);
				for (var x=0; x < attributes.length; x++) {
					var attr = $el.attr(attributes[x]);
					if (typeof attr == 'string' && attr.length > 0) {
						attr = (num !== 1) ? attr.substr(0,attr.lastIndexOf('_')) : attr;
						$el.attr(attributes[x], attr+'_'+num);
					}
				}
				
			});
		}

		// Start it up!
		plugin.init();
	}

	// Register the plugin and iterate over elements
	$.fn.autoRepeat = function(options) {
		return this.each(function() {
			if (undefined == $(this).data('autoRepeat')) {
				var plugin = new $.autoRepeat(this, options);
				$(this).data('autoRepeat', plugin);
			}
		});
	};

})(jQuery);