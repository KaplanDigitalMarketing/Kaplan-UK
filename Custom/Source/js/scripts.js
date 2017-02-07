//= include _appius.kaplan.tabbed-row.js
//= include _appius.equalise.js
//= include _appius.kaplan.accordion.js
//= include _search.js
//= include _mobile-insights-menu.js
//= include _formValid.js

//= include vendor/_modernizr.custom.js
//= include vendor/_mlpushmenu.js

$(document).ready(function () {
    new mlPushMenu(document.getElementById('mp-menu'), document.getElementById('menu-toggle'), {
        type: 'cover'
    }, document.getElementById('close-menu'));

    if (!$('.tag-cloud li').length) {
        $('.tag-cloud').remove();
    }
});
