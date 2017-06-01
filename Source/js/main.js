// Avoid conflicts with Sitefinity's built-in AMD loader
if (typeof define == 'function' && define.amd) {
	var SitefinityDefine = window.define;
	window.define = null;
}

require('./appius.kaplan.accordion.js');
require('./appius.kaplan.blogFilters.js');
require('./appius.kaplan.blogFilter.lazyLoading.js');
require('./search.js');
require('./vendor/modernizr.custom.js');
require('./vendor/mlpushmenu.js');
require('./appius.kaplan.primary-nav.js')


window.appius = {
	tabbedRow: require('./appius.kaplan.tabbed-row.js'),
	equalise: require('./appius.equalise.js')
};

// Restore Sitefinity's built-in AMD loader
if (SitefinityDefine) {
	window.define = SitefinityDefine;
}

$(document).ready(function () {
	appius.tabbedRow.init();
	appius.equalise.init();
});

$(document).ready(function () {
	removeEmptyTags();

    new mlPushMenu(document.getElementById('mp-menu'), document.getElementById('menu-toggle'), {
        type: 'cover'
    }, document.getElementById('close-menu'));

    if (window.innerWidth < 992) {
        mobileInsightsMenu();
    }
});

function removeEmptyTags() {
	$('.tag-list, .tag-list').each(function() {
		if ($(this).find("li").length <= 0) {
			$(this).remove();
		}
	});
}
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
