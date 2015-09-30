/*!
 * Wata
 * Project Website: http://wata.pimmey.com
 *
 * @version 1.0
 * @author Yegor Borisenco <pimmey@pimmey.com>
 *
 */

'use strict';

(function() {
    var triangles = document.getElementById('triangles'),
        nav = document.getElementById('nav'),
        windowHeight,
        navHeight,
        trianglesHeight;

    function resizeTriangles() {
        windowHeight = window.innerHeight;
        navHeight = nav.clientHeight;
        trianglesHeight = windowHeight - navHeight;
        triangles.style.height = trianglesHeight + 'px';
    }

    resizeTriangles();
    window.addEventListener('resize', resizeTriangles);
})();

function trianglesReady() {
}

var ScrollAnimations = function() {
    var controller = new ScrollMagic.Controller();
    var icons = $('.services .animated-color'),
        iconColors = [
            'rgb(26, 35, 126)',
            'rgb(28, 37, 135)',
            'rgb(29, 40, 143)',
            'rgb(31, 42, 152)',
            'rgb(33, 44, 160)',
            'rgb(36, 49, 178)',
            'rgb(38, 52, 186)',
            'rgb(39, 54, 199)',
            'rgb(41, 56, 203)',
            'rgb(43, 58, 211)'
        ];

    var sceneServiceIcons = new ScrollMagic.Scene({triggerElement: '#services', duration: '75%'})
        .addTo(controller);

    var sceneServiceIconsProgress;
    sceneServiceIcons.on('progress', function(event) {
        sceneServiceIconsProgress = Math.floor(event.progress * 10);
        icons.css('color', iconColors[sceneServiceIconsProgress]);
    });

    var scenePrices = new ScrollMagic.Scene({triggerElement: '.best-offer'})
        .setClassToggle('.best-offer', 'z-depth-4')
        .addTo(controller);

    /*
    var sceneGetStartedBg = new ScrollMagic.Scene({triggerElement: '#get-started', duration: '75%'})
        .addTo(controller);

    var sceneGetStartedBgProgress,
        getStartedGrayBgSection = $('#get-started'),
        grayShades = [
            '#f2f2f2',
            '#ededed',
            '#e8e8e8',
            '#e3e3e3',
            '#dedede',
            '#dcdcdc',
            '#d6d6d6',
            '#d3d3d3',
            '#d4d4d4',
            '#cfcfcf'
        ];

    sceneGetStartedBg.on('progress', function(event) {
        sceneGetStartedBgProgress = Math.floor(event.progress * 10);
        getStartedGrayBgSection.css('background-color', grayShades[sceneGetStartedBgProgress]);
    });
*/
/*
    var sceneSubscribeBg = new ScrollMagic.Scene({triggerElement: '#subscribe', duration: '75%'})
        .addTo(controller);

    var sceneSubscribeBgProgress,
        subscribeGrayBgSection = $('#subscribe');
    sceneSubscribeBg.on('progress', function(event) {
        sceneSubscribeBgProgress = Math.floor(event.progress * 10);
        subscribeGrayBgSection.css('background-color',  grayShades[sceneSubscribeBgProgress]);
    });
*/
};

var Shuffle = (function($, imagesLoaded) {
    var $grid = $('div#shuffle-grid'),
        $imgs = $grid.find('img'),
        $filterOptions = $('div.filter-options'),
        $btns = $filterOptions.children(),
        $allButton = $('#all'),
        imgLoad,
        init,
        onAllImagesFinished;

    init = function() {
        imgLoad = new imagesLoaded($imgs.get());
        imgLoad.on('always', onAllImagesFinished);
    };

    onAllImagesFinished = function(instance) {
        $grid.shuffle({
            itemSelector: '.picture-item'
        }); 
    };

    $btns.on('click', function() {
        var $this = $(this),
            isActive = $this.hasClass( 'active' ),
            isAll = $this.attr('id') === 'all',
            group = isActive ? 'all' : $this.data('group');

        if (isActive && isAll) {
            return false;
        }

        if ( ! isActive) {
            $('.filter-options .active').removeClass('active');
        }

        if (isActive && ! isAll) {
            $allButton.addClass('active');
        }

        $this.toggleClass('active');

        if (isAll) {
            $allButton.addClass('active');
        }

        $grid.shuffle('shuffle', group);
    });

    $btns = null;

    return {
        init: init
    };
}(jQuery, window.imagesLoaded));
/*
var CurrencySwitcher = function() {
    var $switcherContainer = $('.currency-switcher'),
        offers = Wata.currencySwitcher.offers,
        offersArray = Object.keys(offers),
        offersLength = offersArray.length,
        symbols = Wata.currencySwitcher.symbols,
        currency;

    $switcherContainer.find('input[type=radio]').on('change', function() {
        currency = this.id;
        for (var i = 0; i < offersLength; i++) {
            $('#' + offersArray[i]).find('.price').text(symbols[currency] + offers[offersArray[i]][currency]);
        }
    });
};
*/
function initializeMap() {
    // Create an array of styles.
    var styles = [
        {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#444444"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#f2f2f2"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 45
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#46bcec"
                },
                {
                    "visibility": "on"
                }
            ]
        }
    ];

    // Create a new StyledMapType object, passing it the array of styles,
    // as well as the name to be displayed on the map type control.
    var styledMap = new google.maps.StyledMapType(styles, {
        name: "Styled Map"
    });

    var myLatLng = new google.maps.LatLng(Wata.googleMaps.lat, Wata.googleMaps.lng);

    // Create a map object, and include the MapTypeId to add
    // to the map type control.
    var mapOptions = {
        zoom: Wata.googleMaps.zoom,
        center: myLatLng,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        },
        scrollwheel: false,
        draggable: false
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map
    });

    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');
}