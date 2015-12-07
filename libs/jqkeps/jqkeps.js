$(document).ready(function() {
    $('#ajax-content').addClass('active').addClass('ajax-content');
    $('#ajax-content').attr('id', '');
    var currentLocation = location.pathname;

    if (history.pushState) {
        window.addEventListener("popstate", function(e) {
            console.log('popstate', e);
            loadAjax(location.pathname, e.state.animation, e.state.scroll, true, e.state.exitAnimation);
        });
    }

    var switchAnimation = function(animation) {
        if (animation.indexOf('slideUp') > -1) {
            animation = animation.replace('slideUp', 'slideDown');            
        } else {
            animation = animation.replace('slideDown', 'slideUp');            
        }
        if (animation.indexOf('slideLeft') > -1) {
            animation = animation.replace('slideLeft', 'slideRight');
        } else {
            animation = animation.replace('slideRight', 'slideLeft');
        }
        return animation;
    };

    var loadAjax = function(link, animation, scroll, back, exitAnimation) {
        if (link) {
            var newContent;
            var oldContent = $('.ajax-content.active');
            var currentScrollY = $(document).scrollTop();
            var currentScrollX = $(document).scrollLeft();
            if (!animation) {
                animation = 'fade';
            }
            if (!exitAnimation) {
                exitAnimation = 'fade';
            }
            if (!scroll) {
                scroll = {x:0,y:0};                
            }

            var finishPage = function() {

            };

            var animatePage = function() {
                if (history.pushState && !back) {
                    history.replaceState({scroll:{x:currentScrollX, y:currentScrollY}, exitAnimation:switchAnimation(animation)}, null);
                    history.pushState({}, null, link);
                }

                oldContent.attr('id', 'ajax-cache'+currentLocation.replace(/\//g, '-'));
                if (ajaxStartPageCallback) {
                    ajaxStartPageCallback();
                }

                oldContent.on('webkitTransitionEnd otransitionend msTransitionEnd transitionend', function(e) {
                    oldContent.addClass('ajax-cache').removeClass('leave '+exitAnimation);
                    oldContent.off('webkitTransitionEnd otransitionend msTransitionEnd transitionend');
                });
                newContent.on('webkitTransitionEnd otransitionend msTransitionEnd transitionend', function(e) {
                    newContent.removeClass('enter '+animation);
                    newContent.off('webkitTransitionEnd otransitionend msTransitionEnd transitionend');
                    window.scrollTo(scroll.x, scroll.y);
                    newContent.css('top', 0);
                });
                oldContent.removeClass('active').addClass('leave '+exitAnimation);
                newContent.css('top', currentScrollY);
                setTimeout(function() {
                    newContent.addClass('enter');
                }, 0);
            };

            if ($('#ajax-cache'+link.replace(/\//g,'-')).length) {
                newContent = $('#ajax-cache'+link.replace(/\//g,'-'));
                newContent.removeClass('ajax-cache').addClass('active '+animation);
                animatePage();
            } else {

                $(document.body).append('<div id="ajax-box"></div>');
                newContent = $('#ajax-box');
                newContent.load(link + ' #ajax-content', function(resp, status, xhr) {
                    if (status === 'error') {
                        if (ajaxErrorCallback) {
                            ajaxErrorCallback();
                        }
                        return false;
                    }

                    newContent.find('#ajax-content').unwrap();
                    newContent = $('#ajax-content');
                    newContent.attr('id', '');
                    newContent.addClass('ajax-content active '+animation);
                    animatePage();
                });
            }
        }
    };

    $('body').on('click', 'a.ajax-link', function(e) {
        e.preventDefault();
        currentLocation = location.pathname;
        var back = $(this).attr('ajax-back');
        if (typeof back !== typeof undefined && back !== false && history.pushState && history.state) {
            history.back();
            return;
        } else {
            var link = $(this).attr('href');
            var animation = $(this).attr('ajax-animation');
            var exitAnimation = $(this).attr('ajax-exit-animation');
            loadAjax(link, animation, {x:0,y:0}, back, exitAnimation);
        }
    });
});