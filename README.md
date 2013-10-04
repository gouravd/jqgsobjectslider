Jquery Objects Slider
================

Jquery Object Slider

A simple carousel that was built for specific needs of GroupShoppy. This plugin is visible at work at the new homepage of www.groupshoppy.com.
It plays well along with Jquery.image-scale.js.

Changelog
=========
v 0.1
--------
Basic features
1) Allows to create a single/Multiple item carousel with any object
2) Allows to syncronize carousel with multiple other objects
3) Allows specify no of items to show
4) Allows start index for main item & synced items

v 0.2
--------
Bug Fix:
=> Changed from setInterval to setTimeout
=> Set the variable for saving the timer in the element itself.

v.0.2.2
--------
Bug Fix: 
=> Now accepting another parameter to check if we should clear timer or not
=> We are also clearing timer during init

v.0.3.0
--------
Bug Fix: 
=> Added code to clear timers on page reload (used mainly in SPA)

v.0.4.0
--------
Bug Fix: 
* More robust timer clearance
* More robust pauseOnHover
