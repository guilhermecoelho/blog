var ln =
{
    init: function () {

        i18n.init
        ({
            lng: 'en',
            ns: 'general',
            useCookie: false,
            fallbackLng: 'en',
            resGetPath: 'locales/__ns__.__lng__.json'
        }, function () {
            $('body').i18n();

        });
    },

};

ln.init();