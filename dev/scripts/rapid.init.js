
/*! toast 1.2.4 (https://github.com/pyrsmk/toast) */

console.log('rapid.init()');

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// TOAST - ASYNC MODULAR LOADING WITH DEPENDENCIES HANDLING
/////////////////////////////////////////////////////////////////////////////////////////////////////////

/* 1kb - Modular load  - Async - https://github.com/pyrsmk/toast - MIT Licens - */
!function (a, b) { "undefined" != typeof module && module.exports ? module.exports = b() : "function" == typeof define && define.amd ? define(b) : a.toast = b() }(this, function () { var a = {}; return function () { var b, c = document, d = c.getElementsByTagName("head")[0], e = this.setTimeout, f = "createElement", g = "appendChild", h = "onreadystatechange", i = "styleSheet", j = 0, k = function () { --j }, l = function (a, c, f, g) { if (d) { if (a.length) { for (b = -1; f = a[++b];) { if ("function" == (g = typeof f)) { c = function () { return f(), !0 }; break } if ("string" == g) m(f); else if (f.pop) { m(f[0]), c = f[1]; break } } n(c, Array.prototype.slice.call(a, b + 1)) } } else e(function () { l(a) }, 10) }, m = function (b, e, l) { l = /(^.+\.\w+)(\?.*)?$/.exec(b)[1], a[l] || (a[l] = 1, ++j, /\.js$/.test(l) ? (e = c[f]("script"), e.src = b, d[g](e), null === e[h] ? e[h] = p : e.onload = k) : (e = c[f]("link"), e.rel = i, e.href = b, d[g](e), o(e))) }, n = function (a, b) { return j || a && !a() ? void e(function () { n(a, b) }, 10) : void l(b) }, o = function (a) { return a.sheet || a[i] ? void k() : void e(function () { o(a) }, 10) }, p = function () { /ded|co/.test(this.readyState) && k() }; l(arguments) } });




/////////////////////////////////////////////////
/////////////////////////////////////////////////
///// RAPID - Drag and drop
/////////////////////////////////////////////////
/////////////////////////////////////////////////


// OLD

/*

  $.getScript('http://clients.ottoboni.se/Frontend/tsr-inject.js');
  1. gå in på dn.se
  2. kör dessa i consolen. en efter en.
  $.getScript('http://clients.ottoboni.se/Frontend/tsr-inject.js'); 
  $.getScript('http://clients.ottoboni.se/Frontend/rapid.js');
  3. skriv sedan i consolen
  window.inject.toggleDnD
  4. nere i höger hörn på dn.se får du nu toggle knapp. klicka på den och en alert kommer up.

*/


/////////////////////////////////////////////////
///// RAPID - Inject ui
/////////////////////////////////////////////////

// ** rapid.init (First steps)
// ** ** ** Load files and setup
//

/*

  1.  $.getScript('http://clients.ottoboni.se/Frontend/Rapid/_assets/rapid.DnD.js');
  2.  window.RAPID.start();    or    window.RAPID.load(prefix);

*/


/////////////////////////////////////////////////
///// RAPID - MAKE DRAGGABLE
/////////////////////////////////////////////////

/*

  1.  $.getScript('http://clients.ottoboni.se/Frontend/Rapid/_assets/rapid.DnD.js'); 
  2.  window.RAPID.start();    or    window.RAPID.load(prefix);

*/



//////////////////////////////////
///// TOAST 
//////////////////////////////////



(function (window, undefined) {

    console.log('rapid.firstSteps()');

    "use strict";

    // Scope set
 
    window.rapid = window.rapid || {};


    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////// FM - CUSTOM EVENTS
    /////////////////////////////////////////////////////////////////////////////////////////////////////////

    rapid.listen = function (eventName, callback) {
        if (document.addEventListener) {
            document.addEventListener(eventName, callback, false);
        } else {
            document.documentElement.attachEvent('onpropertychange', function (e) {
                if (e.propertyName == eventName) {
                    callback();
                }
            });
        }
    };

    rapid.trigger = function (eventName) {
        if (document.createEvent) {
            var event = document.createEvent('Event');
            event.initEvent(eventName, true, true);
            document.dispatchEvent(event);
        } else {
            document.documentElement[eventName]++;
        }
    };

   

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////// FM - IS MODERN BROWSER
    /////////////////////////////////////////////////////////////////////////////////////////////////////////


    rapid.isModern = function () {
        if ('querySelector' in document
                    && 'addEventListener' in window
                    && 'localStorage' in window
                    && 'sessionStorage' in window
                    && 'bind' in Function
                    && (
                        ('XMLHttpRequest' in window && 'withCredentials' in new XMLHttpRequest())
                        || 'XDomainRequest' in window
                    )
                ) {
            return true;
        } else {
            return false;
        }
    }

    // Show value
    console.log("rapid.step.check.isModern: " + rapid.isModern());

    if (rapid.isModern()) {

        var docClass = document.documentElement.className; // HTML tag

        // http://modernizr.com/download/#-svg
        function hasSvgSupport() {
            var ns = { 'svg': 'http://www.w3.org/2000/svg' };
            return !!document.createElementNS && !!document.createElementNS(ns.svg, 'svg').createSVGRect;
        }
        if (hasSvgSupport()) {
            docClass += ' svg';
        }

        document.documentElement.className = docClass.replace(/\bis-not-modern\b/g, 'is-modern');
    }






    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////// FM - GET META
    /////////////////////////////////////////////////////////////////////////////////////////////////////////


    // getMeta function: get a meta tag by name
    // NOTE: meta tag must be in the HTML source before this script is included in order to guarantee it'll be found
    rapid.getMeta = function (metaname) {
        var metas = window.document.getElementsByTagName("meta");
        var meta;
        for (var i = 0; i < metas.length; i++) {
            if (metas[i].name && metas[i].name === metaname) {
                meta = metas[i];
                break;
            }
        }
        return meta;
    }



    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////// FM - LOAD CSS
    /////////////////////////////////////////////////////////////////////////////////////////////////////////


    rapid.loadCSS = function (name) {
        var css = rapid.getMeta(name);
        var cssURL = css.content;
        toast('' + cssURL + '');
    }

    if (rapid.isModern()) {
        window.addEventListener('resize', loadCssMobilefirst);
    }


    // States for fire once handling
    var mfStateBig = false;
    var mfStateSmall = false;

    function loadCssMobilefirst() {

        var dw = document.documentElement.clientWidth;
        //console.log('re-width: ' + dw + '');

        if (dw >= 750 && rapid.isModern()) {
            if (mfStateBig === false) {
                rapid.loadCSS('cssBig');
                mfStateBig = true;
            }
            if (mfStateSmall === false) {
                rapid.loadCSS('cssSmall');
                mfStateSmall = true;
            }
        } else {
            if (mfStateSmall === false) {
                rapid.loadCSS('cssSmall');
                mfStateSmall = true;
            }
        }

    }

/*
    rapid.loadCSS('oldIndex');
    rapid.loadCSS('oldModules');
    rapid.loadCSS('oldSite');

   

    if (!rapid.isModern()) {
        rapid.loadCSS('notModern');
    } else {
        loadCssMobilefirst();
    }

    */



    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////// FM - GET FONT FORMAT SUPPORT
    /////////////////////////////////////////////////////////////////////////////////////////////////////////


    rapid.getFontFormatSupport = function (ua) {
        ua = ua.toLowerCase();
        var browserSupportsWoff2 = false,
            // for now only Chrome 36+ supports WOFF 2.0.
            woff2browsers = /Chrome\/([0-9]+)/i,
            chromeVersion;

        if (woff2browsers.test(ua)) {
            chromeVersion = parseInt(woff2browsers.exec(ua)[1], 10);

            if (chromeVersion >= 36) {
                browserSupportsWoff2 = true;
            }
        }

        if (browserSupportsWoff2) {
            return 'woff2';
        }

        if (ua.indexOf('android') > -1) {
            return 'ttf';
        }

        return 'woff';
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////// FM - LOAD FONTS
    /////////////////////////////////////////////////////////////////////////////////////////////////////////

    // FONT LOADING MOVE TO LATER/SECOND STEPS

    rapid.loadFonts = function () {

        if (rapid.isModern()) {

            var fonts = document.querySelectorAll("style.font");
            var fontFormat = rapid.getFontFormatSupport(navigator.userAgent);

            console.log("rapid.fontModern: " + fontFormat);

            for (var i = 0, j = fonts.length; i < j; ++i) {
                var font = fonts[i],
                    fontPath = font.getAttribute('data-cache-file-' + fontFormat)
                toast(
                   fontPath
                );
            }

        } else {
            console.log("rapid.fontNotModern: Fallback @font-face");
        }

    }

    // rapid.loadFonts();







}(this));



/*


///// 1. RAPID - for "app" ui
///// 2. PROJECT uijquery-2.1.3.min.jsjquery-2.1.3.min.js
/////   2.1 ex. tsr-core.css
/////   2.2 ex. tsr-fonts.css (base 64 css / woff2?)
/////   2.3 ex. tsr.js
///// 3. UX theme styles (Unique projekt or default)
///// 4. SEO theme styles (Unique projekt or default)
///// 5. WCAG 2.0 theme styles (Unique projekt or default)


  toast(
      'http://clients.ottoboni.se/Frontend/Rapid/_assets/rapid-ui.css', // Inc Modular  prefix--all.css
      'http://clients.ottoboni.se/Frontend/Rapid/_assets/jquery-2.1.3.min.js'
  );


  toast(
      ['http://clients.ottoboni.se/Frontend/Rapid/_assets/jquery-2.1.3.min.js',function(){return window.jQuery;}],
      'http://clients.ottoboni.se/Frontend/Rapid/_assets/rapid.DnD.js',
      function(){
          log('All scripts are fully loaded, woh yeah!');
      }    
  );


*/




        toast(
               //'http://clients.ottoboni.se/Frontend/Rapid/_assets/rapid-ui.css', // Inc Modular  prefix--all.css
               //'http://clients.ottoboni.se/Frontend/Rapid/_assets/jquery-2.1.3.min.js',
               'styles/rapid-ui.css', // Inc Modular  prefix--all.css
               'scripts/libs/jquery-1.8.2.min.js',
                function () {
                    console.log('rapid.step.load.resources.rapid.ui()');
                    console.log('rapid.step.load.resources.dependency.jquery()');
                    console.log('rapid.step.event.trigger.rapid()');
                    rapid.trigger('rapid');
                             
                    
                }
            );

        rapid.listen('rapid', function () {
          console.log('rapid.step.load.resources.rapid.DnD()');
            toast(
                    //'http://clients.ottoboni.se/Frontend/Rapid/_assets/rapid.DnD.js',
                    'scripts/rapid.DnD.js',
                    function () {
                    
                }
                );
        });


