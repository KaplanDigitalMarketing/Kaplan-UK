window.Cookies = require('./vendor/_cookie.js');

$(document).ready(function() {
    $('.blog-filter__selector-item').on('click', function(e) {
        e.preventDefault();

        // Grab the index of the selected item
        var $parentItem = $(this).parents(".blog-filter__selector");
        var i = $parentItem.find(".blog-filter__selector-item").index($(this));

        toggleSelector($(this), i);
        setCookieOnSelected(i);
    });

    function toggleSelector($elem, i) {
        $('.blog-filter__selector-item.selected').removeClass('selected');
        $('.blog-filter__set.active').removeClass('active');

        $elem.addClass('selected');
        $('.blog-filter__set').eq(i).addClass('active');
    }

    function checkURLForActive() {
        var url = window.location.href;

        $('.blog-filter__selector-item[data-classification]').each(function() {
            var classification = $(this).attr('data-classification');
            if (url.indexOf(classification) !== -1) {
                // var $parentItem = $(this).parents(".blog-filter__selector");
                // var i = $parentItem.find(".blog-filter__selector-item").index($(this));
                var i = readCookieOfSelected();
                toggleSelector($(this), i);
                $('.blog-filter__selector-item.selected').removeClass('selected');
                $('.blog-filter__selector-item').eq(i).addClass('selected');
            }
        });
    }

    function checkForSelectedTab() {
        var i = readCookieOfSelected();
        if (typeof i !== "undefined") {
            toggleSelector($(this), i);
        }
    }

    function setCookieOnSelected(index) {
        Cookies.set('insight-filter-index', index, {expires: 7, path: ''});
    }

    function readCookieOfSelected() {
        return Cookies.get('insight-filter-index');
    }

    checkURLForActive();
    // checkForSelectedTab();
});
