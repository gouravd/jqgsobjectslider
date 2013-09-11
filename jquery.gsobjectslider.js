/*******************
*********************
****** Jquery Object Slider by Gourav das
****** V 0.1
****** Allows to slide any element synchronizing other elements. demo at https://www.groupshoppy.com
***********************
********************/


(function ($) {
	$.fn.gsObjectSlider = function (options) {

		var settings = $.extend({
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
			'syncSelectorsStartCount' : [0]

		}, options);

		this.each(function () {
			// Store the object

			$(this).hover(function (ev) {
				if (settings.debug == true) {
					console.log('mouseovered');
				}

				clearInterval(infiniteLoop);
			}, function (ev) {
				infiniteLoop = setInterval(ObjectSlider, settings.itemInterval);
			});

			var $this = $(this);
			var $item = (settings.itemSelector == null) ? $($this).first() : $(settings.itemSelector);
			var $parent = $($this);
			var syncselectors = settings.syncSelectors.split(',');
			//var selectorsItems = [];
			//$(selectors).each(function (index, val) {
			//    selectorsItems.push($(val).length)
			//});

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
				if (syncselectors.length == settings.syncSelectorsVisibleCount.length && syncselectors.length > 1 && syncselectors.length == settings.syncSelectorsStartCount.length) {
					syncSelectorsCurrentItem[index] = 0 + settings.syncSelectorsStartCount[index];
					syncSelectorsNumberOfItems[index] = $(val).length;
					var itemtoshow = syncSelectorsCurrentItem[index] + 1;
					for (var x = 0; x < settings.syncSelectorsVisibleCount[index]; x++) {
						itemtoshow = syncSelectorsCurrentItem[index] + x < Number(syncSelectorsNumberOfItems[index]) ?
							syncSelectorsCurrentItem[index] + x :
							(syncSelectorsCurrentItem[index] + x) % Number(syncSelectorsNumberOfItems[index] - 1);

						$(val).eq(itemtoshow).css('opacity', '1.0');
						$(val).eq(itemtoshow).fadeIn(settings.initialFadeIn);
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

					clearInterval(infiniteLoop);
				}, function (ev) {
					infiniteLoop = setInterval(ObjectSlider, settings.itemInterval);
				});
			});

			$($item).eq(itemCurrentItem).fadeIn(settings.initialFadeIn);

			//loop through the items
			var infiniteLoop = setInterval(ObjectSlider, settings.itemInterval);

			function ObjectSlider() {
				if (settings.debug == true) {
					console.log('Fading Item - ' + itemCurrentItem + ', Loading Item - ' + itemNextItem);
				}
				$(syncselectors).each(function (index, val) {
					if ($(syncselectors).length == settings.syncSelectorsVisibleCount.length && $(syncselectors).length > 1) {
						if (settings.debug == true) {
							console.log('Item to show: ' + syncSelectorsCurrentItem[index]);
							console.log('Item to hide: ' + syncSelectorsNextItem[index]);
						}

						console.log($(val).attr('class') + ': ' + syncSelectorsCurrentItem[index]);
						console.log($(val).attr('class') + ': ' + syncSelectorsNextItem[index]);

						$(val).eq(syncSelectorsCurrentItem[index]).fadeOut(settings.fadeTime, function () {
							$(val).eq(syncSelectorsNextItem[index]).css('opacity', '1.0');
							$(val).eq(syncSelectorsNextItem[index]).fadeIn(settings.fadeTime);


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

				$($item).eq(itemCurrentItem).fadeOut(settings.fadeTime, function () {
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
			};
		});
	};

})(jQuery);

