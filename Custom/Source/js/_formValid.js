$('input[type="submit"]').click( function(){
    $('.web-lead-form').addClass('submitted');

    $(".web-lead-form input").each(function() {
        if (Boolean($(this)[0].checkValidity) && (! $(this)[0].checkValidity())) {
            var errMessage = $(this).data("errorMessage");
            if($(this).next('.error').length < 1) {
              $(this).after('<div class="error">' + errMessage + '</div>');
            }
        } else {
          $(this).next('.error').remove();
        }
    });
});

$('.web-lead-form input').change(function() {
    if (Boolean($(this)[0].checkValidity) && ($(this)[0].checkValidity())) {
      $(this).next('.error').remove();
    }
});
