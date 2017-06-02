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
