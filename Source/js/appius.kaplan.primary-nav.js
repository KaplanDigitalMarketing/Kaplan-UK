var GROUP_RESET_TIMER = 5000;
var GROUP_DATA_ATTR = 'data-navpanel';

var navTimer = null;

$(document).ready(function() {
    $('.primary-nav__link[data-grouppage]').on('click', function(e) {
        groupPageClick($(this));
    });
});

function groupPageClick($elem) {
    var navPanel = $elem.attr(GROUP_DATA_ATTR);

    if ($("#" + navPanel).length <= 0) return;

    clearCurrentActive();
    setCurrentActive(navPanel);
    resetGroupPage();
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
    clearTimeout(navTimer);

    navTimer = setTimeout(function() {
        clearCurrentActive();
        resetCurrentActive();
    }, GROUP_RESET_TIMER);
}
