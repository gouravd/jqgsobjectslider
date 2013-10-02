/*******************
*********************
****** Jquery Object Slider by Gourav das
****** V 0.2.2
****** Allows to slide any element synchronizing other elements. demo at https://www.groupshoppy.com
***********************
********************/


(function ($) {
    $.fn.gsObjectSlider = function (options, clear) {

	    var settings = $.extend({}, {
			'itemSelector': null,
			'syncSelectors': null,
			'initialFadeIn': 200,
			'itemInterval': 5000,
			'fadeTime': 300,
			'debug': false,
			'pauseOnHover': true,
			'syncSelectorsVisibleCount': [1],
			'itemVisibleCount': 1,
			'itemStartCount': 0,
			'syncSelectorsStartCount': [0],
            'syncSelectorsVertical' : [false]

	    }, options);

	    clear = clear === undefined ? 0 : clear;

	    this.each(function () {
	        var el = this;
	        var $el = $(this);
	        var $item = (settings.itemSelector == null) ? $el.first() : $(settings.itemSelector);
	        var $parent = $el;
	        var syncselectors = (settings.syncSelectors == null) ? new Array() : settings.syncSelectors.split(',');

	        window.clearTimeout(el.infiniteLoop);
	        el.infiniteLoop = null;

	        if (clear === false) {
	            if (settings.debug == true) {
	                console.log("clearing timer");
	            }
	            window.clearTimeout(el.infiniteLoop);
	            return;
	        }

			// Store the object
	        $el.hover(function (ev) {
				if (settings.debug == true) {
					console.log('mouseovered');
				}

				window.clearTimeout(el.infiniteLoop);
			}, function (ev) {
			    el.infiniteLoop = window.setTimeout(ObjectSlider, settings.itemInterval);
			});

			var numberOfItems = $($item).length;

			if (settings.debug == true) {
				console.log('Parent: ' + $parent.attr('class') || $parent.attr('id'));
				console.log('itemSelector: ' + $item.attr('class') || $item.attr('id'));
				console.log("SyncSelectors: " + settings.syncSelectors);
				console.log("No of SyncSelectors: " + syncselectors.length);
				console.log('No of Items: ' + numberOfItems);
			}

			//set current item
			var itemCurrentItem = settings.itemStartCount < Number(numberOfItems - 1) ? settings.itemStartCount : settings.itemStartCount % Number(numberOfItems);
			var itemNextItem = itemCurrentItem + 1 < Number(numberOfItems - 1) ? itemCurrentItem + 1 : (itemCurrentItem + 1) % Number(numberOfItems);

			var syncSelectorsCurrentItem = [];
			var syncSelectorsNextItem = [];
			var syncSelectorsNumberOfItems = [];

			//show first item
			$(syncselectors).each(function (index, val) {
			    if (syncselectors.length == settings.syncSelectorsVisibleCount.length && syncselectors.length > 1 && syncselectors.length == settings.syncSelectorsStartCount.length && syncselectors.length == settings.syncSelectorsVertical.length) {
					syncSelectorsCurrentItem[index] = 0 + settings.syncSelectorsStartCount[index];
					syncSelectorsNumberOfItems[index] = $(val).length;
					var itemtoshow = syncSelectorsCurrentItem[index] + 1;
					for (var x = 0; x < settings.syncSelectorsVisibleCount[index]; x++) {
						itemtoshow = syncSelectorsCurrentItem[index] + x < Number(syncSelectorsNumberOfItems[index]) ?
							syncSelectorsCurrentItem[index] + x :
							(syncSelectorsCurrentItem[index] + x) % Number(syncSelectorsNumberOfItems[index] - 1);

						if (settings.syncSelectorsVertical[index] == true) {
						    $(val).eq(itemtoshow).css('opacity', '1.0');
						    $(val).eq(itemtoshow).fadeIn(settings.initialFadeIn);
						}
						else {
						    $(val).eq(itemtoshow).css('opacity', '1.0');
						    $(val).eq(itemtoshow).css('display', 'inline-block');
						}

					}

					syncSelectorsNextItem[index] = itemtoshow + 1 < Number(syncSelectorsNumberOfItems[index]) ? itemtoshow + 1 : (itemtoshow + 1) % Number(syncSelectorsNumberOfItems[index]);
				}
				else {
					$(val).eq(itemCurrentItem).css('opacity', '1.0');
					$(val).eq(itemCurrentItem).fadeIn(settings.initialFadeIn);
				}

				$(val).hover(function (ev) {
					if (settings.debug == true) {
						console.log('mouseovered');
					}

					window.clearTimeout(el.infiniteLoop);
				}, function (ev) {
				    el.infiniteLoop = window.setTimeout(ObjectSlider, settings.itemInterval);
				});
			});

			$($item).eq(itemCurrentItem).css('opacity', '1.0');
			$($item).eq(itemCurrentItem).fadeIn(settings.initialFadeIn);

			function ObjectSlider() {
				if (settings.debug == true) {
					console.log('Fading Item - ' + itemCurrentItem + ', Loading Item - ' + itemNextItem);
				}
				$(syncselectors).each(function (index, val) {
				    if ($(syncselectors).length == settings.syncSelectorsVisibleCount.length && $(syncselectors).length > 1 && $(syncselectors).length == settings.syncSelectorsVertical.length) {
						if (settings.debug == true) {
							console.log($(val).attr('class') + ': ' + syncSelectorsCurrentItem[index]);
							console.log($(val).attr('class') + ': ' + syncSelectorsNextItem[index]);
						}

						$(val).eq(syncSelectorsCurrentItem[index]).fadeOut(settings.fadeTime, function () {
						    if (settings.syncSelectorsVertical[index] == true) {
						        $(val).eq(syncSelectorsNextItem[index]).css('opacity', '1.0');
						        $(val).eq(syncSelectorsNextItem[index]).fadeIn(settings.fadeTime);
						    }
						    else {
						        $(val).eq(syncSelectorsNextItem[index]).css('opacity', '1.0');
						        $(val).eq(syncSelectorsNextItem[index]).css('display', 'inline-block');
						    }

							syncSelectorsCurrentItem[index] = syncSelectorsCurrentItem[index] + 1 < Number(syncSelectorsNumberOfItems[index]) ? syncSelectorsCurrentItem[index] + 1 : (syncSelectorsCurrentItem[index] + 1) % Number(syncSelectorsNumberOfItems[index]);
							syncSelectorsNextItem[index] = syncSelectorsNextItem[index] + 1 < Number(syncSelectorsNumberOfItems[index]) ? syncSelectorsNextItem[index] + 1 : (syncSelectorsNextItem[index] + 1) % Number(syncSelectorsNumberOfItems[index]);
						});
					}
					else {
						$(val).eq(itemCurrentItem).fadeOut(settings.fadeTime, function () {
							$(val).eq(itemNextItem).css('opacity', '1.0');
							$(val).eq(itemNextItem).fadeIn(settings.fadeTime);
						});
					}
				});

				if (settings.debug == true) {
					console.log('Current item to fade:' + itemCurrentItem);
					console.log('Next item to show:' + itemNextItem);
				}

				if (itemNextItem != itemCurrentItem) {
				    $($item).eq(itemCurrentItem).fadeOut(settings.fadeTime, function () {
				        $($item).eq(itemNextItem).css('opacity', '1.0');
				        $($item).eq(itemNextItem).fadeIn(settings.fadeTime);

				        itemNextItem++;
				        itemCurrentItem++;
				        if (itemNextItem > numberOfItems - 1) {
				            itemNextItem = 0;

				        }
				        if (itemCurrentItem > numberOfItems - 1) {
				            itemCurrentItem = 0;
				        }

				    });
				}
			};

	        //loop through the items
			el.infiniteLoop = window.setTimeout(ObjectSlider, settings.itemInterval);

		});

		return this;
	};

})(jQuery);
