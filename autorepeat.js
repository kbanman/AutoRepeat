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
			onAdd: function() {
				console.log('Adding new repetition', plugin.settings.debug);		 
			}
		};

		// plugin's properties will be available through this object like:
		// plugin.settings.propertyName from inside the plugin or
		// element.data('pluginName').settings.propertyName from outside the plugin, where "element" is the
		// element the plugin is attached to;
		plugin.settings = {}

		var $el = $(element),	// reference to the jQuery version of DOM element the plugin is attached to
			 el = element;		// reference to the actual DOM element

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

		// public methods
		// these methods can be called like:
		// plugin.methodName(arg1, arg2, ... argn) from inside the plugin or
		// element.data('autoRepeat').publicMethod(arg1, arg2, ... argn) from outside the plugin, where "element"
		// is the element the plugin is attached to;

		// a public method. for demonstration purposes only - remove it!
		plugin.repeat = function(num) {
			num = (num > 0) ? num : 1;
			for (var i=1; i <= num; i++) {
				var $newset = $el.clone().insertBefore(plugin.settings.more_button);
				appendNumber($newset, ++plugin.settings.instances);
			}
			return false;
		}

		var appendNumber = function ($fieldset, num)
		{
			var attributes = ['for', 'name', 'id'];
			$('input, label, select, textarea', $fieldset).each(function(index, el) {
				var $el = $(el);
				for (var x=0; x < attributes.length; x++) {
					console.log(x, attributes[x]);
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