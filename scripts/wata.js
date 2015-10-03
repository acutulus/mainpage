/*!
 * Wata
 * Project Website: http://wata.pimmey.com
 *
 * @version 1.0
 * @author Yegor Borisenco <pimmey@pimmey.com>
 *
 */

'use strict';

function loadDeferTag(tagName, attr) {
    var tagsDefer = document.getElementsByTagName(tagName);
    for (var i=0; i<tagsDefer.length; i++) {
        if(tagsDefer[i].getAttribute('data-'+attr)) {
            tagsDefer[i].setAttribute(attr,tagsDefer[i].getAttribute('data-'+attr));
        } 
    } 

}

function init() {
    loadDeferTag('img', 'src');
    loadDeferTag('script', 'src');
    loadDeferTag('link', 'href');
}


var ajaxErrorCallback = function() {
    Materialize.toast("Error loading page");
}

var ajaxStartPageCallback = function() {
    init();

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

    $('.button-collapse').sideNav({
        closeOnClick: true
    });

    //ScrollAnimations();

    //Shuffle.init();

    if ($('form#contact-form').length) {
        (function() {
            var contactForm = $('form#contact-form'),
                contactFormFields = contactForm.find('input, textarea'),
                submitButton = contactForm.find('button[type=submit]'),
                activeButtonClass = 'waves-effect waves-light green accent-2 indigo-text text-darken-4',
                requiredFields = $('.required'),
                requiredFieldsLength = requiredFields.length,
                email = contactForm.find('input#email'),
                isFormReady = false,
                status = $('div#status');

            contactForm.on('submit', function(e) {
                e.preventDefault();

                if (isFormReady) {
                    submitForm();
                } else {
                    if ( ! checkRequired()) {
                        Materialize.toast(Wata.toastMessages.fillInRequiredFields, 5000, 'error');
                    }
                    if ( checkRequired() && ! isEmailValid()) {
                        Materialize.toast(Wata.toastMessages.enterValidEmail, 5000, 'error');
                    }
                }
            });

            contactFormFields.on('blur', function() {
                checkForm();
            });

            email.on('blur', function() {
                var emailValueLength = email[0].value.length;
                if ( ! isEmailValid() && emailValueLength > 0) {
                    email.addClass('invalid').removeClass('valid');
                } else if (isEmailValid() && emailValueLength > 0) {
                    email.addClass('valid').removeClass('invalid');
                } else if (emailValueLength === 0) {
                    email.removeClass('valid invalid');
                }
            });

            function checkRequired() {
                for (var i = 0; i < requiredFieldsLength; i++) {
                    if (requiredFields[i].value.length === 0) {
                        return false;
                    }
                }

                return true;
            }

            function isEmailValid() {
                var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                return email[0].value.length > 0 && re.test(email[0].value);
            }

            function checkForm() {
                if (checkRequired() && isEmailValid()) {
                    submitButton.addClass(activeButtonClass);
                    isFormReady = true;
                } else {
                    submitButton.removeClass(activeButtonClass);
                    isFormReady = false;
                }
            }

            function submitForm() {
                status.show();
                $.ajax({
                    url: contactForm.attr('action'),
                    data: contactForm.serialize(),
                    type: 'POST'
                }).done(function(resp) {
                    status.hide();
                    if (resp == 'success') {
                        Materialize.toast(Wata.toastMessages.messageSent, 7500, 'success');
                        contactFormFields.val('');
                        email.removeClass('valid');
                        checkForm();
                    } else {
                        Materialize.toast(Wata.toastMessages.somethingWrong + resp, 7500, 'error');
                    }
                }).error(function(err) {
                    status.hide();
                    Materialize.toast(Wata.toastMessages.somethingWrong + resp, 7500, 'error');
                });
            }
        })();
    }

    /*
    var mcForm = $('form#mc-embedded-subscribe-form');
    mcForm.ajaxChimp({
        url: $(this).attr('action'),
        callback: function(resp) {
            var message = resp.msg,
                result = resp.result,
                dissmissTime = result === 'success' ? 10000 : 5000;
            Materialize.toast(message.replace(/\d - /, ''), dissmissTime, result);
            if (result === 'success') {
                mcForm.find('input[type=email]').val('');
                mcForm.find('label').removeClass('active');
            }
        }
    });
    */

    $('#explore').on('click', function(e) {
        e.preventDefault();
        var offset = $('#services').offset().top + 1;
        $('html, body').animate({
            scrollTop: offset - 64
        }, {
            duration: 400,
            queue: false,
            easing: 'easeOutCubic'
        });
    });

    $('.activator, .card-title').on('click', function() {
        $(this).parents('.card').toggleClass('active');
    });

    $('.started-btn').click(function() {
        $(document.body).append('<script id="typef_orm" src="https://s3-eu-west-1.amazonaws.com/share.typeform.com/widget.js"></script>');
        $('.typeform-container').css('height', 500);
    });

    $('.materialboxed').length && $('.materialboxed').materialbox();
    
    $('ul.tabs').length && $('ul.tabs').tabs();
    
    /*
    var $masonry = $('.masonry').masonry({
        itemSelector: '.col'
    });

    $masonry.imagesLoaded().progress(function() {
        $masonry.masonry('layout');
    });
    */

    setTimeout(function() {
        //$('div#shuffle-grid').shuffle('update');
    }, 100);

    initTriangles();

    var waiting = false;
    var tolerance = $( window ).height() * 0.7;
    window.onscroll = function() {
        if (!waiting) {
            waiting = true;
            requestAnimationFrame(function() {
                $('.picture-item:not(.animate)').each(function() {
                    if (window.scrollY + tolerance > $(this).offset().top) {
                        $(this).addClass('animate');
                    }
                });
                $('.team .col:not(.animate)').each(function() {
                    if (window.scrollY + tolerance > $(this).offset().top) {
                        $(this).addClass('animate');
                    }
                });
                waiting = false;
            });
        }
    };
};

$(document).ready(function() {
    ajaxStartPageCallback();
});