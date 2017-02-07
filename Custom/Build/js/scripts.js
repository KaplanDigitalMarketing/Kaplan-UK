var appius = appius || {};

appius.tabbedRow = (function($) {
    "use strict";
    var module = {};

    var TRANSITION_SPEED = 400;

    $(function() {
      var inEditMode = $('body').hasClass('.sfPageEditor');
      if (inEditMode) return false;
      $('.tabbed-row [role="tablist"]').each(initTablist);
    });

    function initTablist(index, tablist) {
      var $tablist = $(tablist);
      var $tabs = $tablist.find('[role="tab"]');
      $tabs.each(initTab);
      $tablist.on('click', '[aria-controls]', activateTab);
    }

    function initTab(index, tab) {
      var $tab = $(tab);
      var $tabPanel = $tab.next();
      var isEmpty = $tabPanel.children('.sf_colsIn').children().length == 0;

      if (isEmpty)
        return false;

      var id = getUniqueId();

      $tab
        .attr('aria-controls', '#' + id)
        .find('.tabbed-row__tab-inner')
        .append('<a role="button" class="tabbed-row__button">View more</a>');
      $tabPanel
        .attr('aria-expanded', 'false')
        .attr('id', id);
    }

    function activateTab() {
      var $tab = $(this);
      var $tabpanel = $tab.next();
      var $tablist = $tab.closest('[role="tablist"]');
      var $activeTab = $tablist.find('[role="tab"][aria-selected="true"]');
      var $activeTabpanel = $tablist.find('[role="tabpanel"][aria-expanded="true"]');

      if ($tab.attr('aria-selected') == 'true') {
        $tab.removeAttr('aria-selected');
        $tabpanel
          .attr('aria-expanded', 'false')
          .slideUp(TRANSITION_SPEED);
        return false;
      }

      var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      if (viewportWidth < 992) {
        $activeTabpanel.hide();
        scrollTo($tab); // To avoid rogue scrolling on mobile
        $activeTabpanel.show();
      }

      $activeTab.removeAttr('aria-selected');
      $tab.attr('aria-selected', 'true');

      $activeTabpanel
        .attr('aria-expanded', 'false')
        .slideUp();
      $tabpanel
        .attr('aria-expanded', 'true')
        .slideDown(TRANSITION_SPEED);

      // Embedded Wufoo form support
      var $embeddedForms = $tabpanel.find('[id^="wufoo-"]');
      if ($embeddedForms.length > 0) {
        $embeddedForms.each(function() {
          var $form = $(this);
          var id = $form.attr('id').replace('wufoo-', '');
          window[id].display();
        });
      }
    }

    function scrollTo($elem) {
      $('html, body').animate({
        scrollTop: $elem.offset().top - 12
      }, TRANSITION_SPEED);
    }

    function getUniqueId() {
      var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
      });
      return guid;
    }

    return module;
})(jQuery);

/** querySelectorAll polyfill (IE6/7) */
if (!document.querySelectorAll) {
    document.querySelectorAll = function (selectors) {
        var style = document.createElement('style'), elements = [], element;
        document.documentElement.firstChild.appendChild(style);
        document._qsa = [];

        style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
        window.scrollBy(0, 0);
        style.parentNode.removeChild(style);

        while (document._qsa.length) {
            element = document._qsa.shift();
            element.style.removeAttribute('x-qsa');
            elements.push(element);
        }
        document._qsa = null;
        return elements;
    };
}

/** Cross-browser document.ready handler */
(function () {
    'use strict';
    var readyList = [],
    readyFired = false,
    readyEventHandlersInstalled = false;

    function ready() {
        if (readyFired) return null;

        readyFired = true;
        for (var i = 0; i < readyList.length; i++) readyList[i].call(window);
        readyList = [];
    }

    window.docReady = function (callback) {
        if (readyFired) return setTimeout(callback, 1), null;

        readyList.push(callback);

        if (document.readyState === 'complete' || (!document.attachEvent && document.readyState === 'interactive'))
            return setTimeout(ready, 1), null;

        if (!readyEventHandlersInstalled) {
            if (document.addEventListener) {
                document.addEventListener('DOMContentLoaded', ready, false);
                window.addEventListener('load', ready, false);
            } else {
                document.attachEvent('onreadystatechange', function () {
                    if (document.readyState == 'complete') ready();
                });
                window.attachEvent('onload', ready);
            }
            readyEventHandlersInstalled = true;
        }
    };
})();


/**
* @fileOverview Provides support for the equal-height helper attribute "data-equal"
*   Use different values to creating unique "groupings" of elements. Layout is
*   adjusted automatically on resize based on element offsets, not source order.
*   Call init() to resize after markup changes (e.g. on accordions).
* @author Phil Hazelton [phil@appius.com]
* @version 1.1.0
*/
var equalise = (function () {
    var module = {};
    var ATTR = 'data-equalise';

    // Simplified debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    var debounce = function (func) {
        var timeout;

        return function debounced() {
            var obj = this, args = arguments;
            function delayed() {
                func.apply(obj, args);
                timeout = null;
            };

            if (timeout)
                clearTimeout(timeout);

            timeout = setTimeout(delayed, 100);
        };
    };

    window.onresize = debounce(init);

    /** Run on start and resize, should also be triggeres on DOM changes. */
    function init() {
        var nodeList = document.querySelectorAll('[' + ATTR + ']');
        var nodes = new Array();

        for (var i = nodeList.length >>> 0; i--;) {
            var node = nodeList[i];
            var isVisible = (node.offsetWidth > 0 || node.offsetHeight > 0);

            node.style.height = 'auto';
            if (isVisible)
                nodes.push(node);
        }

        processRow(nodes);
    }

    /** Finds and resizes the next row (recursive). */
    function processRow(nodes) {
        if (nodes.length < 1) return null;

        var row = [];
        var maxHeight = 0;
        var nextNode = findNextNode(nodes);

        var offset, node, group;

        for (var i = nodes.length >>> 0; i--;) {
            offset = getOffset(nodes[i]);
            group = getGroup(nodes[i]);

            if (offset == nextNode.offset && group == nextNode.group) {
                node = nodes.splice(i, 1)[0];
                row.push(node);
                if (node.offsetHeight > maxHeight)
                    maxHeight = node.offsetHeight;
            }
        }

        if (row.length > 1)
            for (var i = row.length >>> 0; i--;)
                row[i].style.height = maxHeight + 'px';

        if (nodes.length > 0)
            processRow(nodes);
    }

    /** Searches an array of nodes for the uppermost element offset. */
    function findNextNode(nodes) {
        if (nodes.length < 1) return null;
        var offset = getOffset(nodes[0]);
        var group = getGroup(nodes[0]);
        var thisOffset;

        for (var i = nodes.length >>> 0; i--;) {
            thisOffset = getOffset(nodes[i]);
            if (thisOffset < offset) {
                offset = thisOffset;
                group = getGroup(nodes[i]);
            }
        }

        return {
            offset: offset,
            group: group
        };
    }

    /** Get the upper offset of an individual node (for checking alignment) */
    function getOffset(node) {
        return node.getBoundingClientRect().top;
    }

    /** Get the group of a node */
    function getGroup(node) {
        return node.getAttribute(ATTR);
    }

    window.docReady(init);

    module.init = init;
    return module;
}());

// Reinitialise on window load, used to recalculate heights once images are loaded.
window.onload = function () {
    window.equalise.init();
}
$('.accordion .content').hide();

$('.accordion .content-expander').addClass('plus-expand');

$('.accordion .content-expander').on("click", function () {

    $('.accordion .content').slideUp();

    $('.accordion .content-expander').addClass('plus-expand')

    if ($(this).next().css('display') !== 'block') {
        $(this).next().slideDown();
        $(this).removeClass('plus-expand');
    } else {
        $(this).next().slideUp();
        $(this).addClass('plus-expand');
    }

    return false;
});
$('.kaplan__page-header a[href="#site-search"]').click(function () {
    $('.kaplan__search-box').slideToggle({ duration: 400, start: slideStart });

    function slideStart() {
        if ($('.kaplan__search-box').css('display') == 'block') {
            if (!$('.search-overlay').length > 0) {
                $('.mod-kaplan-page-content').before('<div class="search-overlay"></div>');
                var overlayHeight = document.body.scrollHeight + 'px';
                $('.search-overlay').css('height', overlayHeight);
            } else {
                $('.search-overlay').remove();
            }
        }
    }

    $('.kaplan__search-text').focus(function () {
        $(this).attr('placeholder', '');
        $('.kaplan__search-box .cta-btn').show();
    });

    $('.kaplan__search-text').focusout(function () {
        $(this).attr('placeholder', 'Search for...');
    });

    return false;
});

$('.kaplan__search-close').click(function () {
    $('.kaplan__search-box').slideUp();
    $('.search-overlay').remove();
    return false;
});

//Perform search
function searchRecords() {
    console.log("search");
    var searchIndex = $('.kaplan__search-box input[name="search-index"]').val();
    var searchText = $('.kaplan__search-text').val().trim();

    if (searchIndex && searchText !== '') {
        window.location = '/search?indexCatalogue=' + searchIndex + '&searchQuery=' + searchText + '&wordsMode=0';
    }
}

$('.kaplan__search-box .cta-btn').click(function () {
    searchRecords();
});

$('.kaplan__search-text').keypress(function (e) {
    var key = e.which;

    if (key === 13) {
        searchRecords();
        return false;
    }
});

function mobileInsightsMenu() {
    $('.blog__menu-grouping p').on('click', function() {
        event.stopPropagation();

        if ($(this).parent().next(".insights-menu").css('display') === 'block')
            $(this).parent().next(".insights-menu").stop().slideUp();
        else
            $(this).parent().next(".insights-menu").stop().slideDown();
    });

    var typeMenu = $('.insights-menu')[1];
    $(typeMenu).attr('id', 'insight-type-dropdown');

    $('.academy__category-title p').on('click', function() {
        event.stopPropagation();

        if ($('.academy__category-list').css('display') === 'block')
            $('.academy__category-list').stop().slideUp();
        else
            $('.academy__category-list').stop().slideDown();
    });
}

$(document).ready(function() {
    if (window.innerWidth < 992)
        mobileInsightsMenu();
});

$('input[type="submit"]').click( function(){
    $('.web-lead-form').addClass('submitted');

    $(".web-lead-form input").each(function() {
        if (Boolean($(this)[0].checkValidity) && (! $(this)[0].checkValidity())) {
            var errMessage = $(this).data("errorMessage");
            if($(this).next('.error').length < 1) {
              $(this).after('<div class="error">' + errMessage + '</div>');
            }
        } else {
          $(this).next('.error').remove();
        }
    });
});

$('.web-lead-form input').change(function() {
    if (Boolean($(this)[0].checkValidity) && ($(this)[0].checkValidity())) {
      $(this).next('.error').remove();
    }
});


/* Modernizr 2.6.2 (Custom Build) | MIT & BSD

 * Build: http://modernizr.com/download/#-csstransforms3d-shiv-cssclasses-teststyles-testprop-testallprops-prefixes-domprefixes-load

 */

window.Modernizr=function(e,t,n){function r(e){g.cssText=e}function o(e,t){return typeof e===t}function i(e,t){return!!~(""+e).indexOf(t)}function a(e,t){for(var r in e){var o=e[r];if(!i(o,"-")&&g[o]!==n)return"pfx"!=t||o}return!1}function c(e,t,r){for(var i in e){var a=t[e[i]];if(a!==n)return r===!1?e[i]:o(a,"function")?a.bind(r||t):a}return!1}function l(e,t,n){var r=e.charAt(0).toUpperCase()+e.slice(1),i=(e+" "+C.join(r+" ")+r).split(" ");return o(t,"string")||o(t,"undefined")?a(i,t):(i=(e+" "+w.join(r+" ")+r).split(" "),c(i,t,n))}var s,u,f,d="2.6.2",p={},h=!0,m=t.documentElement,y="modernizr",v=t.createElement(y),g=v.style,b=({}.toString," -webkit- -moz- -o- -ms- ".split(" ")),E="Webkit Moz O ms",C=E.split(" "),w=E.toLowerCase().split(" "),j={},S=[],x=S.slice,N=function(e,n,r,o){var i,a,c,l,s=t.createElement("div"),u=t.body,f=u||t.createElement("body");if(parseInt(r,10))for(;r--;)c=t.createElement("div"),c.id=o?o[r]:y+(r+1),s.appendChild(c);return i=["&#173;",'<style id="s',y,'">',e,"</style>"].join(""),s.id=y,(u?s:f).innerHTML+=i,f.appendChild(s),u||(f.style.background="",f.style.overflow="hidden",l=m.style.overflow,m.style.overflow="hidden",m.appendChild(f)),a=n(s,e),u?s.parentNode.removeChild(s):(f.parentNode.removeChild(f),m.style.overflow=l),!!a},F={}.hasOwnProperty;f=o(F,"undefined")||o(F.call,"undefined")?function(e,t){return t in e&&o(e.constructor.prototype[t],"undefined")}:function(e,t){return F.call(e,t)},Function.prototype.bind||(Function.prototype.bind=function(e){var t=this;if("function"!=typeof t)throw new TypeError;var n=x.call(arguments,1),r=function(){if(this instanceof r){var o=function(){};o.prototype=t.prototype;var i=new o,a=t.apply(i,n.concat(x.call(arguments)));return Object(a)===a?a:i}return t.apply(e,n.concat(x.call(arguments)))};return r}),j.csstransforms3d=function(){var e=!!l("perspective");return e&&"webkitPerspective"in m.style&&N("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(t,n){e=9===t.offsetLeft&&3===t.offsetHeight}),e};for(var k in j)f(j,k)&&(u=k.toLowerCase(),p[u]=j[k](),S.push((p[u]?"":"no-")+u));return p.addTest=function(e,t){if("object"==typeof e)for(var r in e)f(e,r)&&p.addTest(r,e[r]);else{if(e=e.toLowerCase(),p[e]!==n)return p;t="function"==typeof t?t():t,"undefined"!=typeof h&&h&&(m.className+=" "+(t?"":"no-")+e),p[e]=t}return p},r(""),v=s=null,function(e,t){function n(e,t){var n=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",r.insertBefore(n.lastChild,r.firstChild)}function r(){var e=v.elements;return"string"==typeof e?e.split(" "):e}function o(e){var t=y[e[h]];return t||(t={},m++,e[h]=m,y[m]=t),t}function i(e,n,r){if(n||(n=t),u)return n.createElement(e);r||(r=o(n));var i;return i=r.cache[e]?r.cache[e].cloneNode():p.test(e)?(r.cache[e]=r.createElem(e)).cloneNode():r.createElem(e),i.canHaveChildren&&!d.test(e)?r.frag.appendChild(i):i}function a(e,n){if(e||(e=t),u)return e.createDocumentFragment();n=n||o(e);for(var i=n.frag.cloneNode(),a=0,c=r(),l=c.length;a<l;a++)i.createElement(c[a]);return i}function c(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return v.shivMethods?i(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+r().join().replace(/\w+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(v,t.frag)}function l(e){e||(e=t);var r=o(e);return v.shivCSS&&!s&&!r.hasCSS&&(r.hasCSS=!!n(e,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),u||c(e,r),e}var s,u,f=e.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,p=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,h="_html5shiv",m=0,y={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",s="hidden"in e,u=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(e){s=!0,u=!0}}();var v={elements:f.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:f.shivCSS!==!1,supportsUnknownElements:u,shivMethods:f.shivMethods!==!1,type:"default",shivDocument:l,createElement:i,createDocumentFragment:a};e.html5=v,l(t)}(this,t),p._version=d,p._prefixes=b,p._domPrefixes=w,p._cssomPrefixes=C,p.testProp=function(e){return a([e])},p.testAllProps=l,p.testStyles=N,m.className=m.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(h?" js "+S.join(" "):""),p}(this,this.document),function(e,t,n){function r(e){return"[object Function]"==y.call(e)}function o(e){return"string"==typeof e}function i(){}function a(e){return!e||"loaded"==e||"complete"==e||"uninitialized"==e}function c(){var e=v.shift();g=1,e?e.t?h(function(){("c"==e.t?d.injectCss:d.injectJs)(e.s,0,e.a,e.x,e.e,1)},0):(e(),c()):g=0}function l(e,n,r,o,i,l,s){function u(t){if(!p&&a(f.readyState)&&(b.r=p=1,!g&&c(),f.onload=f.onreadystatechange=null,t)){"img"!=e&&h(function(){C.removeChild(f)},50);for(var r in N[n])N[n].hasOwnProperty(r)&&N[n][r].onload()}}var s=s||d.errorTimeout,f=t.createElement(e),p=0,y=0,b={t:r,s:n,e:i,a:l,x:s};1===N[n]&&(y=1,N[n]=[]),"object"==e?f.data=n:(f.src=n,f.type=e),f.width=f.height="0",f.onerror=f.onload=f.onreadystatechange=function(){u.call(this,y)},v.splice(o,0,b),"img"!=e&&(y||2===N[n]?(C.insertBefore(f,E?null:m),h(u,s)):N[n].push(f))}function s(e,t,n,r,i){return g=0,t=t||"j",o(e)?l("c"==t?j:w,e,t,this.i++,n,r,i):(v.splice(this.i++,0,e),1==v.length&&c()),this}function u(){var e=d;return e.loader={load:s,i:0},e}var f,d,p=t.documentElement,h=e.setTimeout,m=t.getElementsByTagName("script")[0],y={}.toString,v=[],g=0,b="MozAppearance"in p.style,E=b&&!!t.createRange().compareNode,C=E?p:m.parentNode,p=e.opera&&"[object Opera]"==y.call(e.opera),p=!!t.attachEvent&&!p,w=b?"object":p?"script":"img",j=p?"script":w,S=Array.isArray||function(e){return"[object Array]"==y.call(e)},x=[],N={},F={timeout:function(e,t){return t.length&&(e.timeout=t[0]),e}};d=function(e){function t(e){var t,n,r,e=e.split("!"),o=x.length,i=e.pop(),a=e.length,i={url:i,origUrl:i,prefixes:e};for(n=0;n<a;n++)r=e[n].split("="),(t=F[r.shift()])&&(i=t(i,r));for(n=0;n<o;n++)i=x[n](i);return i}function a(e,o,i,a,c){var l=t(e),s=l.autoCallback;l.url.split(".").pop().split("?").shift(),l.bypass||(o&&(o=r(o)?o:o[e]||o[a]||o[e.split("/").pop().split("?")[0]]),l.instead?l.instead(e,o,i,a,c):(N[l.url]?l.noexec=!0:N[l.url]=1,i.load(l.url,l.forceCSS||!l.forceJS&&"css"==l.url.split(".").pop().split("?").shift()?"c":n,l.noexec,l.attrs,l.timeout),(r(o)||r(s))&&i.load(function(){u(),o&&o(l.origUrl,c,a),s&&s(l.origUrl,c,a),N[l.url]=2})))}function c(e,t){function n(e,n){if(e){if(o(e))n||(f=function(){var e=[].slice.call(arguments);d.apply(this,e),p()}),a(e,f,t,0,s);else if(Object(e)===e)for(l in c=function(){var t,n=0;for(t in e)e.hasOwnProperty(t)&&n++;return n}(),e)e.hasOwnProperty(l)&&(!n&&!--c&&(r(f)?f=function(){var e=[].slice.call(arguments);d.apply(this,e),p()}:f[l]=function(e){return function(){var t=[].slice.call(arguments);e&&e.apply(this,t),p()}}(d[l])),a(e[l],f,t,l,s))}else!n&&p()}var c,l,s=!!e.test,u=e.load||e.both,f=e.callback||i,d=f,p=e.complete||i;n(s?e.yep:e.nope,!!u),u&&n(u)}var l,s,f=this.yepnope.loader;if(o(e))a(e,0,f,0);else if(S(e))for(l=0;l<e.length;l++)s=e[l],o(s)?a(s,0,f,0):S(s)?d(s):Object(s)===s&&c(s,f);else Object(e)===e&&c(e,f)},d.addPrefix=function(e,t){F[e]=t},d.addFilter=function(e){x.push(e)},d.errorTimeout=1e4,null==t.readyState&&t.addEventListener&&(t.readyState="loading",t.addEventListener("DOMContentLoaded",f=function(){t.removeEventListener("DOMContentLoaded",f,0),t.readyState="complete"},0)),e.yepnope=u(),e.yepnope.executeStack=c,e.yepnope.injectJs=function(e,n,r,o,l,s){var u,f,p=t.createElement("script"),o=o||d.errorTimeout;p.src=e;for(f in r)p.setAttribute(f,r[f]);n=s?c:n||i,p.onreadystatechange=p.onload=function(){!u&&a(p.readyState)&&(u=1,n(),p.onload=p.onreadystatechange=null)},h(function(){u||(u=1,n(1))},o),l?p.onload():m.parentNode.insertBefore(p,m)},e.yepnope.injectCss=function(e,n,r,o,a,l){var s,o=t.createElement("link"),n=l?c:n||i;o.href=e,o.rel="stylesheet",o.type="text/css";for(s in r)o.setAttribute(s,r[s]);a||(m.parentNode.insertBefore(o,m),h(n,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};


/**
 * mlpushmenu.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
; (function (window) {

    'use strict';

    function extend(a, b) {
        for (var key in b) {
            if (b.hasOwnProperty(key)) {
                a[key] = b[key];
            }
        }
        return a;
    }

    // taken from https://github.com/inuyaksa/jquery.nicescroll/blob/master/jquery.nicescroll.js
    function hasParent(e, id) {
        if (!e) return false;
        var el = e.target || e.srcElement || e || false;
        while (el && el.id != id) {
            el = el.parentNode || false;
        }
        return (el !== false);
    }

    // returns the depth of the element "e" relative to element with id=id
    // for this calculation only parents with classname = waypoint are considered
    function getLevelDepth(e, id, waypoint, cnt) {
        cnt = cnt || 0;
        if (e.id.indexOf(id) >= 0) return cnt;
        if ($(e).hasClass(waypoint)) {
            ++cnt;
        }
        return e.parentNode && getLevelDepth(e.parentNode, id, waypoint, cnt);
    }

    // http://coveroverflow.com/a/11381730/989439
    function mobilecheck() {
        var check = false;
        (function (a) { if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    }

    // returns the closest element to 'e' that has class "classname"
    function closest(e, classname) {
        if ($(e).has(classname)) {
            return e;
        }
        return e.parentNode && closest(e.parentNode, classname);
    }

    function mlPushMenu(el, trigger, options, closeBtn) {
        this.el = el;
        this.trigger = trigger;
        this.options = extend(this.defaults, options);
        this.closeBtn = closeBtn;
        // support 3d transforms
        this.support = Modernizr.csstransforms3d;
        if (this.support) {
            this._init();
        }
    }

    mlPushMenu.prototype = {
        defaults: {
            // overlap: there will be a gap between open levels
            // cover: the open levels will be on top of any previous open level
            type: 'overlap', // overlap || cover
            // space between each overlaped level
            levelSpacing: 40,
            // classname for the element (if any) that when clicked closes the current level
            backClass: 'mp-back'
        },
        _init: function () {
            // if menu is open or not
            this.open = false;
            // level depth
            this.level = 0;
            // the moving wrapper
            this.wrapper = document.getElementById('mp-pusher');
            // the mp-level elements
            this.levels = Array.prototype.slice.call(this.el.querySelectorAll('div.mp-level'));
            // save the depth of each of these mp-level elements
            var self = this;
            this.levels.forEach(function (el, i) { el.setAttribute('data-level', getLevelDepth(el, self.el.id, 'mp-level')); });
            // the menu items
            this.menuItems = Array.prototype.slice.call(this.el.querySelectorAll('li'));
            // if type == "cover" these will serve as hooks to move back to the previous level
            this.levelBack = Array.prototype.slice.call(this.el.querySelectorAll('.' + this.options.backClass));
            // event type (if mobile use touch events)
            this.eventtype = mobilecheck() ? 'touchstart' : 'click';
            // add the class mp-overlap or mp-cover to the main element depending on options.type
            $(this.el).addClass('mp-' + this.options.type);
            // initialize / bind the necessary events
            this._initEvents();
        },
        _initEvents: function () {
            var self = this;

            // the menu should close if clicking somewhere on the body
            var bodyClickFn = function (el) {
                self._resetMenu();
                el.removeEventListener(self.eventtype, bodyClickFn);
            };

            // open (or close) the menu
            this.trigger.addEventListener(this.eventtype, function (ev) {
                ev.stopPropagation();
                ev.preventDefault();
                if (self.open) {
                    self._resetMenu();
                }
                else {
                    self._openMenu();
                    // the menu should close if clicking somewhere on the body (excluding clicks on the menu)
                    document.addEventListener(self.eventtype, function (ev) {
                        if (self.open && !hasParent(ev.target, self.el.id)) {
                            bodyClickFn(this);
                        }
                    });
                }
            });

            this.closeBtn.addEventListener(this.eventtype, function (ev) {
                ev.stopPropagation();
                ev.preventDefault();
                if (self.open) {
                    self._resetMenu();
                }
            });

            // opening a sub level menu
            this.menuItems.forEach(function (el, i) {
                // check if it has a sub level
                var subLevel = el.querySelector('div.mp-level');
                if (subLevel) {
                    el.querySelector('a').addEventListener(self.eventtype, function (ev) {
                        ev.preventDefault();
                        var $closestElem = $(el).closest('.mp-level');
                        var level = parseInt($closestElem.attr('data-level'), 10);
                        if (self.level <= level) {
                            ev.stopPropagation();
                            $closestElem.addClass('mp-level-overlay');
                            self._openMenu(subLevel);
                        }
                    });
                }
            });

            // closing the sub levels :
            // by clicking on the visible part of the level element
            this.levels.forEach(function (el, i) {
                el.addEventListener(self.eventtype, function (ev) {
                    ev.stopPropagation();
                    var level = parseInt($(el).attr('data-level'), 10);
                    if (self.level > level) {
                        self.level = level;
                        self._closeMenu();
                    }
                });
            });

            // by clicking on a specific element
            this.levelBack.forEach(function (el, i) {
                el.addEventListener(self.eventtype, function (ev) {
                    ev.preventDefault();
                    var $closestElem = $(el).closest('.mp-level');
                    var level = parseInt($closestElem.attr('data-level'), 10);
                    if (self.level <= level) {
                        ev.stopPropagation();
                        self.level = level - 1;
                        self.level === 0 ? self._resetMenu() : self._closeMenu();
                    }
                });
            });
        },
        _openMenu: function (subLevel) {
            // increment level depth
            ++this.level;

            // move the main wrapper
            var levelFactor = (this.level - 1) * this.options.levelSpacing,
				translateVal = this.options.type === 'overlap' ? this.el.offsetWidth + levelFactor : $(this.el).outerWidth();

            this._setTransform('translate3d(' + translateVal + 'px,0,0)');

            if (subLevel) {
                // reset transform for sublevel
                this._setTransform('', subLevel);
                // need to reset the translate value for the level menus that have the same level depth and are not open
                for (var i = 0, len = this.levels.length; i < len; ++i) {
                    var levelEl = this.levels[i];
                    if (levelEl != subLevel && !$(levelEl).hasClass('mp-level-open')) {
                        this._setTransform('translate3d(-100%,0,0) translate3d(' + -1 * levelFactor + 'px,0,0)', levelEl);
                    }
                }
            }
            // add class mp-pushed to main wrapper if opening the first time
            if (this.level === 1) {
                $(this.wrapper).addClass('mp-pushed');
                this.open = true;
            }
            // add class mp-level-open to the opening level element
            $(subLevel || this.levels[0]).addClass('mp-level-open');
        },
        // close the menu
        _resetMenu: function () {
            this._setTransform('translate3d(0,0,0)');
            this.level = 0;
            // remove class mp-pushed from main wrapper
            $(this.wrapper).removeClass('mp-pushed');
            this._toggleLevels();
            this.open = false;
        },
        // close sub menus
        _closeMenu: function () {
            var translateVal = this.options.type === 'overlap' ? this.el.offsetWidth + (this.level - 1) * this.options.levelSpacing : $(this.el).outerWidth();
            this._setTransform('translate3d(' + translateVal + 'px,0,0)');
            this._toggleLevels();
        },
        // translate the el
        _setTransform: function (val, el) {
            el = el || this.wrapper;
            el.style.WebkitTransform = val;
            el.style.MozTransform = val;
            el.style.transform = val;
        },
        // removes classes mp-level-open from closing levels
        _toggleLevels: function () {

            for (var i = 0, len = this.levels.length; i < len; ++i) {
                var levelEl = this.levels[i];
                var levelElNum = parseInt($(levelEl).attr('data-level'), 10);
                if (levelElNum >= (this.level + 1)) {
                    $(levelEl).removeClass('mp-level-open');
                    $(levelEl).removeClass('mp-level-overlay');
                }
                else if (levelElNum == this.level) {
                    $(levelEl).removeClass('mp-level-overlay');
                }
            }
        }
    }
    // add to global namespace
    window.mlPushMenu = mlPushMenu;

})(window);

$(document).ready(function () {
    new mlPushMenu(document.getElementById('mp-menu'), document.getElementById('menu-toggle'), {
        type: 'cover'
    }, document.getElementById('close-menu'));

    if (!$('.tag-cloud li').length) {
        $('.tag-cloud').remove();
    }
});
