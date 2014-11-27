define([ 'jquery' ], function( $ ){
    var fadeTimeout;
    var fadeOutSpeed = 1000;
    var hidden = false;

    function makeToggleButtonVisible() {
        clearTimeout( fadeTimeout );

        $( '.fadeout').stop( true );
        $( '.fadeout').css('display', '');
        $( '.fadeout').css('opacity', '');

        $('html').css({ cursor: '' });
    }

    function beginToggleButtonFade() {
        if ( $('.togglable').hasClass('hidden')) {
            fadeTimeout = setTimeout( function(){
                $( '.fadeout' ).fadeOut(fadeOutSpeed, function() {
                    $('html').css({ cursor: 'none' });
                });
            }, 1000);
        }
    }

    $('body').mousemove( function() {
        makeToggleButtonVisible();

        beginToggleButtonFade();
    });

    beginToggleButtonFade();

    return {
        togglePanel: function() {
            makeToggleButtonVisible();
            $('.togglable').toggleClass('hidden');

            hidden = !hidden;

            if (hidden) {
                beginToggleButtonFade();
                $('#toggle-all').text('Show')
            } else {
                $('#toggle-all').text('Hide')
            }
        }
    }

});