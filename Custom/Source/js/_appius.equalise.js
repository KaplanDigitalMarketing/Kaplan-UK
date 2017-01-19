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