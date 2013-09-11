jqgsobjectslider
================

Jquery Object Slider

A simple carousel that was built for specific needs of GroupShoppy. This plugin is visible at work at the new homepage of www.groupshoppy.com.
It plays well along with Jquery.image-scale.js.

Syntax
=======
$(parent_selector).gsObjectSlider({
      'itemSelector': null, //item_that_would_be_slided,
			'syncSelectors': null, //comma_separated_selectors_for_items_that_would_be_slided_in_sync,
			'initialFadeIn': 200, //Time in ms it takes to fade in the items for first time
			'itemInterval': 5000, //Time interval in ms it takes to change item in the cycle
			'fadeTime': 300, //Time in ms it takes to fadeout during transition
			'debug': false, //show debug messages
			'pauseOnHover': true, //Pause on mouse over
			'syncSelectorsVisibleCount': [1], //Array of visible items for Synced items. Total items in the array should match to the number of comma separated Sync selectors
			'itemVisibleCount': 1, //Visible items of main sliding element
			'itemStartCount': 0, //Start index of main sliding element
			'syncSelectorsStartCount' : [0] //Array of start indices items for Synced items. Total items in the array should match to the number of comma separated Sync selectors
});

Changelog
=========
v 0.1
--------
Basic features
1) Allows to create a single/Multiple item carousel with any object
2) Allows to syncronize carousel with multiple other objects
3) Allows specify no of items to show
4) Allows start index for main item & synced items
