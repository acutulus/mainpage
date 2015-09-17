/*!
 * Wata
 * Project Website: http://wata.pimmey.com
 *
 * @version 1.0
 * @author Yegor Borisenco <pimmey@pimmey.com>
 *
 */

'use strict';

var startPage = function() {
    var isMobile = window.matchMedia("only screen and (max-width: 600px)"),
        isParallax = $('.parallax').length;

    isParallax = $('.parallax').length;

    if (isParallax && ! isMobile.matches) {
        $('.parallax').parallax();
    } else if (isParallax && isMobile) {
        $('.parallax img').css({
            display: 'block',
            height: 500
        })
    }

    $('.materialboxed').length && $('.materialboxed').materialbox();
    $('ul.tabs').length && $('ul.tabs').tabs();
    setTimeout(function() {
        $('div#shuffle-grid').shuffle('update');
        $('.masonry').masonry();        
    }, 500);
};

$(document).ready(function() {
    startPage();

    (function() {
        var wrapper = $('#wrapper'),
            ajaxBox = $('#ajax-box'),
            isMobile = window.matchMedia("only screen and (max-width: 600px)"),
            isParallax;

        $('a.ajax-link').on('click', function(e) {
            e.preventDefault();

            var scrollX = $(document).scrollTop();
            var scrollY = $(document).scrollLeft();
            var link = $(this).attr('href');
            var animation = $(this).attr('ajax-animation');
            if (!animation) {
                animation = 'enter';
            }

            ajaxBox.load(link + ' .ajax-content', function(resp, status, xhr) {
                if (status === 'error') {
                    unLoadAjax();
                    Materialize.toast(Wata.toastMessages.somethingWrong + xhr.status + ' ' + xhr.statusText, 5000, 'error');
                    return false;
                }

                if (history.pushState) {
                    history.pushState({scrollX:scrollX, scrollY:scrollY}, null, link.href);
                }

                wrapper.fadeOut('fast', function() {
                    window.scrollTo(0, 0);
                });

                ajaxBox.addClass(animation);

                setTimeout(function() {
                    ajaxBox.removeClass(animation);
                    wrapper.remove();
                    ajaxBox.attr("id","wrapper");
                    $(document.body).appendChild('<div id="ajaxBox"></div>');
                    if (startPage) {
                        startPage();
                    } 
                }, 750);
            });
        });

        if (history.pushState) {
            window.addEventListener("popstate", function(e) {
                console.log(e);
            });

        }
    })();

});