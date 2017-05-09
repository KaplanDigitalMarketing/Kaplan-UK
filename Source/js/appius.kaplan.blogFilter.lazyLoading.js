var Masonry = require('masonry-layout');
var Mustache = require('mustache');

var BLOG_FILTER_SERVICE = '/custom/services/blogpostsservice.asmx/GetPosts';
var LOAD_FAILURE_ERROR_TEXT = 'There has been an issue getting posts, please try again';
var TIMEOUT_ERROR_TEXT = 'The service took too long';
var SERVICE_TIMEOUT_PERIOD = 5000;

var template;
var msnry;
var params;


// This value is used to check how many times to silently attempt to reload
// the ajax request to get items from the service.
var reloadAttempts = 2;
var reloadAttemptsDefault = reloadAttempts;

if (typeof blogOptions !== "undefined") {
    params = {
        Blogs: blogOptions.blogIds,
        PageSize: blogOptions.pageSize,
        CurrentPage: 0,
        Inclusive: false,
        SkipAmount: 0
    };
}

function initializeInsightMasonry() {
    msnry = new Masonry('.insight-articles', {
        itemSelector: '.insight-articles__item',
        columnWidth: '.grid-sizer',
        percentPosition: true,
        gutter: 0,
        resize: true,
        isResizeBound: true
    });

    msnry.on( 'layoutComplete', function( laidOutItems ) {
      masonryItemsAdded();
    });

    window.msnry = msnry;
}


function showLoadingIcon() {
    $('.insight-loader').show();
}

function hideLoadingIcon() {
    $('.insight-loader').hide();
}

function initialiseLazyLoad($elem, initialLoad) {

    var cookieResponse;

    reloadAttempts = reloadAttemptsDefault;

    showLoadingIcon();

    // If the user has hit the page, not pressed "Show more"
    if (initialLoad) {
        cookieResponse = parseInt(readHistoryData(), 10);

        if (typeof cookieResponse !== "undefined" && !isNaN(cookieResponse))
            params.CurrentPage = cookieResponse;
        else
            params.CurrentPage = 1;

        params.Inclusive = true;


        // Minus one to offset the first larger item
        if (params.CurrentPage > 1) {
            params.PageSize = (params.CurrentPage * blogOptions.pageSize) - 1;
        } else if (params.CurrentPage === 1) {
            params.PageSize -= 1;
        }
    }
    else {
        // Increase the page count to get the next set of items
        params.CurrentPage++;
        params.Inclusive = false;
        params.scrollPosition = undefined;
        params.PageSize = blogOptions.pageSize;
    }

    queueBlogRequests();

}

function queueBlogRequests() {
    // Chcek to see we still have attempts available.
    var displayErrors = false;

    if (reloadAttempts > 0) {
        reloadAttempts--;
        if (reloadAttempts === 0) displayErrors = true;

        requestBlogItemsFromService(displayErrors, function callback (status) {
            if (status === false) {
                queueBlogRequests();
            } else {
                setHistoryData();
            }
        });
    }
}

function requestBlogItemsFromService(displayErrors, callback) {

    // Query the blog item service
    $.ajax({
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: BLOG_FILTER_SERVICE,
        data : JSON.stringify(params),
        method: 'POST',
        timeout: SERVICE_TIMEOUT_PERIOD,
        success: function (data, status, xhr) {
            hideLoadingIcon();
            if (data.d && data.d.Posts) {
                if (data.d.Posts[0] && data.d.Posts[0].Page == 1) {
                    data.d.Posts[0].FirstItem = true;
                }
                updateContent(data.d);
            }
            callback(true);
        },
        error : function(xhr, textStatus, errorThrown) {
            hideLoadingIcon();

            if (xhr && displayErrors) {
                if (textStatus === "error") {
                    displayError(LOAD_FAILURE_ERROR_TEXT);
                }
                else if (xhr.statusText === "timeout") {
                    displayError(TIMEOUT_ERROR_TEXT);
                }
            }

            callback(false);
        }
    });
}


function displayError(errorText) {
    $('<p class="insights__error">'+ errorText +'</p>').insertAfter('#blog__latest-articles');
    $('.blog__lazy-load').hide();
}

// Masrony layout updated
function masonryItemsAdded() {
    if (typeof params.scrollPosition !== "undefined") {
        setTimeout(function() {
            window.scrollTo(0, params.scrollPosition);

            // Remove no animaton after first load
            if (params.Inclusive) {
                $('.insight-articles.no-animation').removeClass('no-animation');
            }
        }, 1);
    }

}

function updateContent(data) {
    var $markup = $(Mustache.render(template, data));
    $('.insight-articles').append($markup);
    msnry.appended($markup);

    //If new item count is the same as the total item count, hide the "next page" button
    var currentItemCount = $('.insight-articles__item').length;
    if (currentItemCount >= data.TotalCount) {
        $('.blog__lazy-load').hide();
    }
}

function setHistoryData() {

    if (window.history) {
        historyData = {
            path: window.location.href,
            scrollTop: $(window).scrollTop(),
            currentPage: params.CurrentPage
        };

        window.history.replaceState(historyData, window.title, window.location.href);
    }
}

function readHistoryData() {
    if (window.history && window.history.state) {
        var currentState = history.state;
        params.scrollPosition = currentState.scrollTop;
        return currentState.currentPage;
    } else {
        return 1;
    }
}

$(document).ready(function () {
    template = $('#insight-article-template').html();
    Mustache.parse(template);

    if (typeof blogOptions !== "undefined") {
        initializeInsightMasonry();
        initialiseLazyLoad($(this), true);
    }

    $('.blog__lazy-load').on('click', function (e) {
        e.preventDefault();
        initialiseLazyLoad($(this), false);
    });
});

// Add event listener when user navigates from the page
window.addEventListener("beforeunload", function (e) {
    setHistoryData();
});
