/*!
 * Wata
 * Project Website: http://wata.pimmey.com
 *
 * @version 1.0
 * @author Yegor Borisenco <pimmey@pimmey.com>
 *
 */

'use strict';

$(document).ready(function() {
    var isMobile = window.matchMedia("only screen and (max-width: 600px)"),
        isParallax = $('.parallax').length;

    if (isParallax && ! isMobile.matches) {
        $('.parallax').parallax();
    } else if (isParallax && isMobile) {
        $('.parallax img').css({
            display: 'block',
            height: '500'
        })
    }

    (function() {
        var scrollPosition,
            wrapper = $('#wrapper'),
            ajaxBox = $('#ajax-box'),
            isMobile = window.matchMedia("only screen and (max-width: 600px)"),
            isParallax;

        $('a.ajax-link').on('click', function(e) {
            e.preventDefault();

            scrollPosition = $(document).scrollTop();

            ajaxBox.load($(this).attr('href') + ' .ajax-content', function(resp, status, xhr) {
                if (status === 'error') {
                    unLoadAjax();
                    Materialize.toast(Wata.toastMessages.somethingWrong + xhr.status + ' ' + xhr.statusText, 5000, 'error');
                    return false;
                }

                wrapper.fadeOut('fast', function() {
                    window.scrollTo(0, 0);
                });

                $('.materialboxed').length && $('.materialboxed').materialbox();
                $('ul.tabs').length && $('ul.tabs').tabs();

                ajaxBox.addClass('enter');

                setTimeout(function() {
                    ajaxBox.removeClass('translate enter');
                    $('#ajax-status').hide();

                    isParallax = $('.parallax').length;

                    if (isParallax && ! isMobile.matches) {
                        $('.parallax').parallax();
                    } else if (isParallax && isMobile) {
                        $('.parallax img').css({
                            display: 'block',
                            height: 500
                        })
                    }
                }, 750);
            });
        });

        $(document).on('click', '#close-ajax', function(e) {
            e.preventDefault();
            unLoadAjax();
        });

        function unLoadAjax() {
            ajaxBox.removeClass('enter').addClass('translate');
            setTimeout(function() {
                ajaxBox.html('');
            }, 750);
            wrapper.show().css('visibility', 'hidden');
            $(document).scrollTop(scrollPosition);
            wrapper.hide().css('visibility', 'visible').fadeIn();

            $('div#shuffle-grid').shuffle('update');
            $('.masonry').masonry();
        }
    })();

});