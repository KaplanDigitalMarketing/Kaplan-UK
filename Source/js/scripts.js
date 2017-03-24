//= include _appius.kaplan.tabbed-row.js
//= include _appius.equalise.js
//= include _appius.kaplan.accordion.js
//= include _appius.kaplan.blogFilters.js
//= include _search.js

//= include vendor/modernizr.custom.js
//= include vendor/_mlpushmenu.js

require('masonry-layout');

$(document).ready(function () {
    new mlPushMenu(document.getElementById('mp-menu'), document.getElementById('menu-toggle'), {
        type: 'cover'
    }, document.getElementById('close-menu'));

    if (window.innerWidth < 992) {
        mobileInsightsMenu();
    }

    if (!$('.tag-cloud li').length) {
        $('.tag-cloud').remove();
    }

    $('.insight-articles').masonry({
        itemSelector: '.insight-articles__item',
        columnWidth: '.grid-sizer',
        percentPosition: true,
        gutter: 15
    });
});

$(window).load(function() {
    $('.insight-articles').masonry({
        itemSelector: '.insight-articles__item',
        columnWidth: '.grid-sizer',
        percentPosition: true,
        gutter: 15
    });
});


function mobileInsightsMenu() {
    $('.blog__menu-grouping p').on('click', function () {
        event.stopPropagation();

        if ($(this).parent().next(".insights-menu").css('display') === 'block') {
            $(this).parent().next(".insights-menu").stop().slideUp();
        } else {
            $(this).parent().next(".insights-menu").stop().slideDown();
        }
    });

    var typeMenu = $('.insights-menu')[1];
    $(typeMenu).attr('id', 'insight-type-dropdown');

    $('.academy__category-title p').on('click', function () {

        event.stopPropagation();

        if ($('.academy__category-list').css('display') === 'block') {
            $('.academy__category-list').stop().slideUp();
        } else {
            $('.academy__category-list').stop().slideDown();
        }
    });
}
