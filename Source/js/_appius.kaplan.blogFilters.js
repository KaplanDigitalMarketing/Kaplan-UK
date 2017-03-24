$(document).ready(function() {
    $('.blog-filter__selector-item').on('click', function(e) {
        e.preventDefault();
        var $parentItem = $(this).parents(".blog-filter__selector");
        var i = $parentItem.find(".blog-filter__selector-item").index($(this));
        toggleSelector($(this), i);
        console.log(i);
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
                var $parentItem = $(this).parents(".blog-filter__selector");
                var i = $parentItem.find(".blog-filter__selector-item").index($(this));
                toggleSelector($(this), i);
            }
        });
    }

    checkURLForActive();
});
