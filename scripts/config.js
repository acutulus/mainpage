var Wata = {

    // Configuration of triangles
    triangles: {
        mesh: {
            depth: 11,
            slices: 250
        },
        light: {
            ambient: '#2aa6cf',
            diffuse: '#39a490',
            distance: 55
        }
    },

    // Various toast messages
    toastMessages: {
        fillInRequiredFields: 'Please fill in the required fields',
        enterValidEmail: 'Please enter a valid email address',
        messageSent: "Your message has been sent. We'll get back to you soon.",
        somethingWrong: 'Something went wrong, try again. Error: '
    },

    // Currency switcher
    currencySwitcher: {
        offers: {
            standard: {
                usd: 19.0,
                eur: 17.0
            },
            professional: {
                usd: 49.0,
                eur: 43.0
            },
            extended: {
                usd: 99.0,
                eur: 87.0
            }
        },
        symbols: {
            usd: '$',
            eur: '€'
        }
    },

    // Google map position and marker name
    googleMaps: {
        lat: 37.782259,
        lng: -122.406417,
        zoom: 16
    }
};