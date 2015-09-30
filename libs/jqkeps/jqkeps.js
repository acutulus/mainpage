$(document).ready(function() {
    if (history.pushState) {
        window.addEventListener("popstate", function(e) {
            console.log('popstate', e);
            loadAjax(location.pathname, e.state.animation, e.state.scroll, true);
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

    var loadAjax = function(link, animation, scroll, back) {
        if (link) {
            var wrapper = $('#ajax-content');
            var ajaxBox = $('#ajax-box');
            var scrollY = $(document).scrollTop();
            var scrollX = $(document).scrollLeft();
            var currentLocation = location.pathname;
            if (!animation) {
                animation = 'fade';
            }
            ajaxBox.addClass('active').addClass(animation);
            if (!scroll) {
                scroll = {x:0,y:0};                
            }

            var finishPage = function() {
                wrapper.attr('id', 'ajax-cache'+currentLocation.replace(/\//g, '-'));
                wrapper.addClass('ajax-cache');
                //wrapper.remove();
                $('#ajax-content').unwrap();
                $(document.body).append('<div id="ajax-box"></div>');
                console.log($('script[ajax-replay]'));
            };

            var animatePage = function() {
                if (history.pushState && !back) {
                    history.replaceState({scrollX:scrollX, scrollY:scrollY, animation:switchAnimation(animation)}, null);
                    history.pushState({}, null, link);
                }

                wrapper.fadeOut('fast', function() {
                    window.scrollTo(scroll.x, scroll.y);
                    if (ajaxStartPageCallback) {
                        ajaxStartPageCallback();
                    }
                });

                ajaxBox.one('webkitTransitionEnd otransitionend msTransitionEnd transitionend', function(e) {
                    finishPage();
                });
                setTimeout(function() {
                    ajaxBox.addClass('enter');                    
                }, 0);
            };

            if ($('#ajax-cache'+link.replace(/\//g,'-')).length) {
                ajaxBox = $('#ajax-cache'+link.replace(/\//g,'-'));
                animatePage();
            } else {
                ajaxBox.load(link + ' #ajax-content', function(resp, status, xhr) {
                    if (status === 'error') {
                        if (ajaxErrorCallback) {
                            ajaxErrorCallback();
                        }
                        return false;
                    }

                    animatePage();
                });
            }
        }
    };

    $('body').on('click', 'a.ajax-link', function(e) {
        e.preventDefault();
        var back = $(this).attr('ajax-back');
        if (typeof back !== typeof undefined && back !== false && history.pushState && history.state) {
            history.back();
            return;
        } else {
            var link = $(this).attr('href');
            var animation = $(this).attr('ajax-animation');
            loadAjax(link, animation, {x:0,y:0}, false);
        }
    });
});