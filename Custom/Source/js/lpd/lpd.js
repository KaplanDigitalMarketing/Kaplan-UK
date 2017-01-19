//= include _plugins.js


$('.video .lpd .full-width-hero .hero-overlay').css('background', 'none!important');


var animated = false;
var IS_TOUCH = 'ontouchstart' in document.documentElement;

//IS_TOUCH = true;

$(document).ready(function (event) {


    if (IS_TOUCH) {
        $('.lpd.fixed-container > .sf_colsOut').addClass('is-touch');
    }

    $(".lpd.fixed-container nav.sub-nav").sticky({ topSpacing: 0 });

    $('#ldnaOverlaySplash').cycle({
        slides: '.sld',
        fx: 'fade',
        speed: 1000,
        timeout: 4000
    });

    $('#ldna-back-to-top').on('click', function (e) {
        $('body').animate({ scrollTop: 0 }, '1500');
    });

    $(".card").flip({
        axis: 'y',
        trigger: 'manual'
    });


    /* MULTI CONTENT SLIDER CODE */
    var headerSlider = $('.multi-content-slider .heading-slider .slides'),
		contentSlider = $('.multi-content-slider .content-slider');

    headerSlider.cycle({
        slides: '.header-slide',
        fx: 'fade',
        prev: '.control.prev-slide',
        next: '.control.next-slide',
        pager: '.multi-content-slider .deliverables',
        pagerActiveClass: 'active',
        timeout: 0
    });

    contentSlider.cycle({
        slides: '.content-slide',
        fx: 'fade',
        timeout: 0
    });

    headerSlider.on('cycle-pager-activated', function (e) {
        contentSlider.cycle('goto', headerSlider.data("cycle.opts").currSlide);
        $('.content-pager .marker').removeClass().addClass('marker slide-' + headerSlider.data("cycle.opts").currSlide);
    });
    headerSlider.on('cycle-next', function (e) {
        contentSlider.cycle('goto', headerSlider.data("cycle.opts").currSlide);
        $('.content-pager .marker').removeClass().addClass('marker slide-' + headerSlider.data("cycle.opts").currSlide);
    });
    headerSlider.on('cycle-prev', function (e) {
        contentSlider.cycle('goto', headerSlider.data("cycle.opts").currSlide);
        $('.content-pager .marker').removeClass().addClass('marker slide-' + headerSlider.data("cycle.opts").currSlide);
    });
    /* MULTI CONTENT SLIDER CODE */

    /* WHITE CONTENT SLIDER CODE */
    var whiteContentSlider = $('.white-content-carousel'),
		carousel_i = 1;

    whiteContentSlider.each(function () {
        var self = $(this);

        console.log(carousel_i);

        if ($('.carousel-item', self).length && $('.carousel-item', self).length > 5) {

            self.wrap('<div class="white-carousel-wrapper"></div>').before('<div class="control next-control next-control-' + carousel_i + '"></div><div class="control prev-control prev-control-' + carousel_i + '"></div>');

            self.cycle({
                slides: '.carousel-item',
                fx: 'carousel',
                prev: '.white-carousel-wrapper .prev-control-' + carousel_i,
                next: '.white-carousel-wrapper .next-control-' + carousel_i,
                carouselVisible: 4,
                timeout: 0
            });

            carousel_i++;
        };

    });
    /* WHITE CONTENT SLIDER CODE */

    /* CASE STUDY CAROUSEL */
    var caseStudyCarousel = $('.case-study-carousel-animate');
    if ($('.carousel-pods .case-study-pod', caseStudyCarousel).length > 4) {
        $('.carousel-pods', caseStudyCarousel).before('<div class="cs-control prev"></div><div class="cs-control next"></div>');
        $('.carousel-pods', caseStudyCarousel).cycle({
            slides: '.case-study-pod',
            fx: 'carousel',
            prev: '.case-study-carousel .prev',
            next: '.case-study-carousel .next',
            carouselVisible: 4
        });
    }
    /* CASE STUDY CAROUSEL */

    /* PROFILE CAROUSEL */
    var profileCarousel = $('.profile-carousel');

    $('.content-carousel', profileCarousel).cycle({
        slides: '.carousel-item',
        fx: 'carousel',
        prev: '.control-profile.prev',
        next: '.control-profile.next',
        carouselVertical: true,
        carouselVisible: 1,
        timeout: 0
    });
    /* PROFILE CAROUSEL */

    /* CASE STUDY SINGLE CAROUSEL */
    var csCarousel = $('.cs-carousel');


    if ($('.carousel-pods .case-study-pod', csCarousel).length > 2) {
        $('.carousel-pods', csCarousel).before('<div class="cs-control prev"></div><div class="cs-control next"></div>');
        $('.carousel-pods', csCarousel).cycle({
            slides: '.case-study-pod',
            fx: 'carousel',
            prev: '.cs-control.prev',
            next: '.cs-control.next',
            carouselVertical: true,
            carouselVisible: 2,
            timeout: 0,
            autoHeight: false
        });
    }
    /* CASE STUDY SINGLE CAROUSEL */

    /* GLOBAL REACH MARKERS */
    var marker = $('.global-reach .marker');

    $('.pointer', marker).on('click', function () {
        $('.marker.open').toggleClass('open').toggleClass('scaling');
        $(this).parent().toggleClass('open').toggleClass('scaling');
    });

    $('.marker .info .close').on('click', function () {
        $('.marker.open').toggleClass('open').toggleClass('scaling');
    });

    marker.each(function () {
        $(this).css({
            'top': $(this).data('top') - 540,
            'left': $(this).data('left')
        });
    });

    var i = 0;

    marker.each(function () {
        var el = $(this);

        setTimeout(function () {
            el
            .animate(
                { top: '+=540' },
                {
                    duration: 500,
                    specialEasing: {
                        top: 'easeOutBounce'
                    },
                    complete: function () { if (!el.hasClass('open')) el.addClass('scaling') }
                }

            );
        }
        , i + 500);
        i += 200;
    });
    /* GLOBAL REACH MARKERS */


    /* VIDEO CONTROLS AND TABS */

    var video_data = {
        'decision-making': {
            'Decision Making': '1_nv9zbo2z',

        },
        'leadership-identity': {
            'Choose to develop': '1_damal3pc',
        },
        'commu-infl': {
            'Relationships': '1_72qhg2gh',
            'Political affairs': '1_q5s66bnf'
        },
        'teams-and-team': {
            'Teams': '1_vjwxfbh1'
        },
        'motivating': {
            'Performance Management': '1_fe0p03sx'
        },
        'leading-managing': {
            'Innovation': '1_fct1w8xp'
        },
        'technical-knowledge': {
            'Accounts, any use?': '1_btzgydtl',
            'Tax': '1_m7swap68',
            'Everything is about Money': '1_bxorqqe7',
            'Financial Reporting &amp; Tax': '1_yq66o5u3',
            'IFRS9': '1_hexcgno8',
            'Kaplan Leadership Challenge': '1_pvd2umfd',
            'Budgets': '1_w7rurbzd'
        }
    };

    var video_tabs = $('.title-tabs'), video_tabs_html = '';

    function makeTabs(vids) {

        video_tabs_html = '';

        vids = video_data[vids];

        for (var prop in vids) {
            video_tabs_html += '<a class="title-tab" data-code="' + vids[prop] + '">' + prop + '</a>';
        }

        $('.title-tab:not(.placeholder)', video_tabs).remove();

        $('.title-tab.placeholder', video_tabs).before(video_tabs_html);

        var
				total_tabs = $('.title-tab:not(.placeholder)', video_tabs).length,
				tabs_width = 0,
				widest = 0,
				widest_outer = 0,
				zindex = 200,
				i = 1;


        $('.title-tab:not(.placeholder)', video_tabs).each(function () {
            el = $(this);
            tabs_width += el.outerWidth();

            if (el.width() > widest) {
                widest = el.width();
                widest_outer = el.outerWidth();
            }
        });

        console.log(tabs_width, video_tabs.width());

        if (tabs_width > video_tabs.width()) {
            $('.title-tab.placeholder').css({ 'display': 'inline-block' });
            // Setting Last tab to right
            $('.title-tab:not(.placeholder):last', video_tabs).css({ 'right': 0, 'z-index': zindex });

            // Setting First tab to left
            $('.title-tab:not(.placeholder):first', video_tabs).css({ 'left': 0, 'z-index': zindex + total_tabs });

            var right_push = (video_tabs.width() - widest_outer) / (total_tabs - 1);

            $('.title-tab:not(.placeholder):not(:first):not(:last)', video_tabs).each(function () {

                var el = $(this), right = 0;

                right = widest_outer - el.outerWidth();

                el.css({
                    'right': (right_push * i),
                    'z-index': zindex + i
                });

                i++;
            });
        } else {
            $('.title-tab:not(.placeholder)').each(function () {
                $(this).css({ 'position': 'static' });
            });
            $('.title-tab.placeholder').css({ 'display': 'none' });
        }

        $('.title-tab:not(.placeholder):first', video_tabs).click();
    }

    video_tabs.on('click', '.title-tab:not(.placeholder)', function () {
        var el = $(this);

        $('.title-tab:not(.placeholder).active').removeClass('active');
        el.addClass('active');

        kWidget.embed({
            "targetId": "kaltura_player_1447769118",
            "wid": "_1408331",
            "uiconf_id": 32184981,
            "flashvars": {
                'autoPlay': false,
                'playlistAPI': {
                    'autoPlay': false,
                    'kpl0Id': el.data('code')
                }
            },
            "cache_st": 1447769118
        });
    });

    makeTabs('decision-making');

    $('.title-tab:not(.placeholder):first', video_tabs).click();

    /* --------------------- VIDEO DIAL --------------------- */
    var control = $('#bg-board .control');

    control.on('click', function () {
        var el = $(this), current = $('#bg-board').attr('class'), d = el.data('video');

        makeTabs(d);

        $('.pdc-fw .column-right > h4').html(el.data('heading'));

        if (el.data('control') != 'dmv') {
            $('#bg-board').removeClass(current).addClass('selected active-' + el.data('control'));
            $('#bg-board .active').removeClass('active');
            el.addClass('active');
        }
        else {
            $('#bg-board').removeClass(current);
            $('#bg-board .active').removeClass('active');
            el.addClass('active');
        }

        $('.select-topic span').on('click', function () {
            $('#bg-board .control.dmv').click();
        });


    });
    /* --------------------- VIDEO DIAL --------------------- */



    /* VIDEO CONTROL AND TABS */


    if (IS_TOUCH) {
        $('#bg-video').remove();

        $('.op-bullets').each(function (e) {
            var bullet = $(this);

            $('.' + bullet.data('card') + ' .card').flip(true);
            bullet.addClass('active');

        });

    }


}).on('scroll', function (e) {
    var bottomPosition = $(document).scrollTop() + $(window).height(),
		aniPanel = $('.animated-panel');

    //console.log($(document).scrollTop());
    //*/




    if (!IS_TOUCH) {
        $('.fba').each(function (e) {
            var fbaPosition = $(this).position().top,
				cssPosition = ($(this).data('positionx') != null ? $(this).data('positionx') + '% ' : 'center ') + (((bottomPosition - fbaPosition) / $(this).data('speed')) - $(this).data('start')) + 'px',
				cssBGSizeX = ($(this).data('sizex') != null ? $(this).data('sizex') + 'px' : 'auto'),
				cssBGSizeY = ($(this).data('sizey') != null ? $(this).data('sizey') + 'px' : 'auto');

            if (bottomPosition > fbaPosition) {
                $(this).css({ backgroundPosition: cssPosition });
            }
        });
    }

    //*/
    if (aniPanel.length)
        if ((bottomPosition > (aniPanel.position().top + aniPanel.data('offset'))) && (!(animated))) {
            animated = true;
            aniPanel.find(".animated-panel-widget").animate({
                top: "-=50"
            }, 2000, function () {
                // Animation complete.
            });
        }

    if (!IS_TOUCH) {

        $('.op-bullets').each(function (e) {
            var bullet = $(this),
				bulletTop = $(this).offset().top,
				areaTop = $(window).scrollTop() + (($(window).height() / 2) - 70),
				areaBottom = $(window).scrollTop() + (($(window).height() / 2) + 70);

            if ((bulletTop > (areaTop - 130)) && (bulletTop < (areaBottom - 130))) {
                $('.' + bullet.data('card') + ' .card').flip(true);
                bullet.addClass('active');
            } else {
                $('.' + bullet.data('card') + ' .card').flip(false);
                bullet.removeClass('active');
            }
        });

    }

});
