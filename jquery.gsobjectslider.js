/*******************
*********************
****** Jquery Object Slider by Gourav das
****** V 0.4.3
****** Allows to slide any element synchronizing other elements. demo at https://www.groupshoppy.com
***********************
********************/


(function ($) {
    $.fn.gsObjectSlider = function (options) {

        var settings = $.extend({}, {
            'itemSelector': null,
            'maxItemCount': 1,
            'syncSelectors': null,
            'initialFadeIn': 200,
            'itemInterval': 5000,
            'fadeTime': 300,
            'debug': false,
            'itemPauseOnHover': true,
            'syncSelectorsPauseOnHover': true,
            'syncSelectorsVisibleCount': [1],
            'itemVisibleCount': 1,
            'itemStartCount': 0,
            'syncSelectorsStartCount': [0],
            'syncSelectorsVertical': [false],
            'useLazyLoad': false,
            'imageScaleType': 'fill',
            'noloadImage': null

        }, options);
        
        $('img').error(function () {
            $(this).attr('src', settings.noloadImage);
        });
        
        this.each(function () {

            var el = this;
            var $el = $(el);
            var $item = (settings.itemSelector == null) ? $el.first() : $(settings.itemSelector);
            var $parent = $el;
            var syncselectors = (settings.syncSelectors == null) ? new Array() : settings.syncSelectors.split(',');

            $('.gsslidertimerid').each(function (indexx, valx) {
                var timer = $(valx).attr('timer');
                if ($(valx).hasClass($(el).attr('class'))) {
                    clearInterval(timer);
                    $(valx).remove();
                }
            });
            
            if (settings.useLazyLoad == true) {
                $($item).lazyload({
                    event: "forcedload"
                });
            }

            var numberOfItems = Math.min($($item).length, settings.maxItemCount);

            if (settings.debug == true) {
                console.log('Parent: ' + $parent.attr('class') || $parent.attr('id'));
                console.log('itemSelector: ' + $item.attr('class') || $item.attr('id'));
                console.log("SyncSelectors: " + settings.syncSelectors);
                console.log("No of SyncSelectors: " + syncselectors.length);
                console.log('No of Items: ' + numberOfItems);
            }

            //set current item
            var itemCurrentItem = settings.itemStartCount <= Number(numberOfItems - 1) ? settings.itemStartCount : settings.itemStartCount % Number(numberOfItems);
            var itemNextItem = itemCurrentItem + 1 <= Number(numberOfItems - 1) ? itemCurrentItem + 1 : (itemCurrentItem + 1) % Number(numberOfItems);

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

                if (settings.syncSelectorsPauseOnHover == true) {
                    $(val).off('mouseover');
                    //$(val).off('mouseout');

                    $(val).on('mouseover', function (ev) {
                        var timer = $(el).attr('timer');
                        window.clearInterval(timer);
                        $('#gsslidertimerid_' + timer).remove();

                        $('.gsslidertimerid').each(function (indexx, valx) {
                            var timer = $(valx).attr('timer');
                            if ($(valx).hasClass($(el).attr('class'))) {
                                clearInterval(timer);
                                $(valx).remove();
                            }
                        });
                    });

                    $(val).on('mouseout', function (ev) {
                        if (!$(el).hasClass('gsslidertimerid')) {
                            var timer = window.setInterval(ObjectSlider, settings.itemInterval);
                            $(el).attr('timer', timer);

                            var div = $('<div id="gsslidertimerid_' + timer + '" class="gsslidertimerid" timer="' + timer + '" style="display:none;"></div>');
                            $(div).addClass($(el).attr('class'));
                            $('html').append($(div));
                        }
                    });
                }
            });


            if (!$($item).eq(itemCurrentItem).hasClass('scaled')) {
                if (settings.useLazyLoad == true) {
                    $($item).eq(itemCurrentItem).trigger('forcedload');
                }
                $($item).eq(itemCurrentItem).imageScale({
                    //parent_css_selector: '.ourcatboxcontent.' + val.nvar_CATEGORY_ID, // Defaults to the image's immediate parent.
                    scale: settings.imageScaleType,
                    center: true,
                    fade_duration: 1000, // Fading is disabled if set to 0.
                    rescale_after_resize: true
                });
                $($item).eq(itemCurrentItem).addClass('scaled');
            }

            $($item).eq(itemCurrentItem).css('opacity', '1.0');
            $($item).eq(itemCurrentItem).fadeIn(settings.initialFadeIn);

            var ObjectSlider = function () {
                numberOfItems = Math.min($($item).length, settings.maxItemCount);

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
                        if (!$($item).eq(itemNextItem).hasClass('scaled')) {
                            if (settings.useLazyLoad == true) {
                                $($item).eq(itemNextItem).trigger('forcedload');
                            }
                            $($item).eq(itemNextItem).imageScale({
                                //parent_css_selector: '.ourcatboxcontent.' + val.nvar_CATEGORY_ID, // Defaults to the image's immediate parent.
                                scale: settings.imageScaleType,
                                center: true,
                                fade_duration: 1000, // Fading is disabled if set to 0.
                                rescale_after_resize: true
                            });
                            $($item).eq(itemNextItem).addClass('scaled');
                        }
                        $($item).eq(itemNextItem).css('opacity', '1.0');
                        $($item).eq(itemNextItem).fadeIn(settings.fadeTime);

                        ++itemNextItem;
                        ++itemCurrentItem;

                        if (itemNextItem > (numberOfItems - 1)) {
                            itemNextItem = 0;

                        }
                        if (itemCurrentItem > (numberOfItems - 1)) {
                            itemCurrentItem = 0;
                        }
                    });
                }
            };

            
            if (numberOfItems > 1) {
                var timer = window.setInterval(ObjectSlider, settings.itemInterval);
                $(el).attr('timer', timer);
            }

            if ($(el).hasClass('gsslidertimerid')) {
                clearInterval(timer);
                $('#gsslidertimerid_' + timer).remove();

                if (numberOfItems > 1) {
                    timer = window.setInterval(ObjectSlider, settings.itemInterval);
                    $(el).attr('timer', timer);

                    var div = $('<div id="gsslidertimerid_' + timer + '" class="' + $(el).attr('class') + '" style="display:none;"></div>');
                    $(div).attr('timer', timer);
                    $('#gsslidertimerid_' + timer).remove();
                    $('html').append($(div));
                }
            }
            else {
                if (numberOfItems > 1) {
                    var div = $('<div id="gsslidertimerid_' + timer + '" class="gsslidertimerid ' + $(el).attr('class') + '" style="display:none;"></div>');
                    $(div).attr('timer', timer);
                    $('#gsslidertimerid_' + timer).remove();
                    $('html').append($(div));
                }
            }


            if (settings.itemPauseOnHover == true) {
                $(el).hover(function (ev) {
                    ev.stopPropagation();
                    var timer = $(el).attr('timer');
                    window.clearInterval(timer);
                    $('#gsslidertimerid_' + timer).remove();

                    $('.gsslidertimerid').each(function (indexx, valx) {
                        var timer = $(valx).attr('timer');
                        if ($(valx).hasClass($(el).attr('class'))) {
                            clearInterval(timer);
                            $(valx).remove();
                        }
                    });
                }, function (ev) {
                    ev.stopPropagation();
                    var timer = window.setInterval(ObjectSlider, settings.itemInterval);
                    if (numberOfItems > 1) {
                        $(el).attr('timer', timer);

                        $('.gsslidertimerid').each(function (indexx, valx) {
                            var timer = $(valx).attr('timer');
                            if ($(valx).hasClass($(el).attr('class'))) {
                                clearInterval(timer);
                                $(valx).remove();
                            }
                        });

                        var div = $('<div id="gsslidertimerid_' + timer + '" class="gsslidertimerid" timer="' + timer + '" style="display:none;"></div>');
                        $(div).addClass($(el).attr('class'));
                        $('html').append($(div));
                    }
                });
            }
        });
        
        return this;
    };

})(jQuery);
