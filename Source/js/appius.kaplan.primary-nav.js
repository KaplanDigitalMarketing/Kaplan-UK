var GROUP_DATA_ATTR = 'data-navpanel';

var navTimer = null;
var groupPageRequiresReset = false;

$(document).ready(function() {
    $('.primary-nav__link:not([data-grouppage])').on('mousedown, touchstart', function(e) {
        e.stopImmediatePropagation();
        if (groupPageRequiresReset) {
            window.location.href = $(this).attr("href");
        }
    });

    $('.primary-nav__link[data-grouppage]').on('click', function(e) {
        e.stopPropagation();

        groupPageClick($(this));
    });

    $('.primary-nav__link[data-grouppage=true]').on('blur', function(e) {
        e.stopPropagation();
        e.stopImmediatePropagation();

        if (groupPageRequiresReset) {
            resetGroupPage();
        }
    });

    $(window).on('scroll', function() {
        if (groupPageRequiresReset) {
            resetGroupPage();
        }
    });
});

function groupPageClick($elem) {
    var navPanel = $elem.attr(GROUP_DATA_ATTR);

    if ($("#" + navPanel).length <= 0) return;

    clearCurrentActive();
    setCurrentActive(navPanel);
    groupPageRequiresReset = true;
}

// Remove all active pages
function clearCurrentActive() {
    $('.primary-nav__container--two.selected').removeClass('selected');
    $('.primary-nav__item.selected').removeClass('selected');
}

// Reset selected pages
function resetCurrentActive() {
    $('.primary-nav__container--two.active').addClass('selected');
    $('.primary-nav__item.active').addClass('selected');
}

// Reset selected pages
function setCurrentActive(item) {
    $("#" + item).addClass("selected");
    $(".primary-nav__link["+GROUP_DATA_ATTR+"='"+ item + "']").parent('.primary-nav__item').addClass('selected');
}

function resetGroupPage() {
    // Clear any existing timers
    clearCurrentActive();
    resetCurrentActive();
    groupPageRequiresReset = false;
}
