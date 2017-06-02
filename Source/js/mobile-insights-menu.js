function mobileInsightsMenu() {
    $('.blog__menu-grouping p').on('click', function() {
        event.stopPropagation();

        if ($(this).parent().next(".insights-menu").css('display') === 'block')
            $(this).parent().next(".insights-menu").stop().slideUp();
        else
            $(this).parent().next(".insights-menu").stop().slideDown();
    });

    var typeMenu = $('.insights-menu')[1];
    $(typeMenu).attr('id', 'insight-type-dropdown');

    $('.academy__category-title p').on('click', function() {
        event.stopPropagation();

        if ($('.academy__category-list').css('display') === 'block')
            $('.academy__category-list').stop().slideUp();
        else
            $('.academy__category-list').stop().slideDown();
    });
}

$(document).ready(function() {
    if (window.innerWidth < 992)
        mobileInsightsMenu();
});
