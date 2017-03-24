$('.accordion .content').hide();

$('.accordion .content-expander').addClass('plus-expand');

$('.accordion .content-expander').on("click", function () {

    $('.accordion .content').slideUp();

    $('.accordion .content-expander').addClass('plus-expand')

    if ($(this).next().css('display') !== 'block') {
        $(this).next().slideDown();
        $(this).removeClass('plus-expand');
    } else {
        $(this).next().slideUp();
        $(this).addClass('plus-expand');
    }

    return false;
});