define([ 'jquery' ], function( $ ){
    var fadeTimeout;
    var fadeOutSpeed = 1000;
    var hidden = false;

    function makeToggleButtonVisible() {
        clearTimeout( fadeTimeout );

        $( '.fade').stop( true );
        $( '.fade').css('display', '');
        $( '.fade').css('opacity', '');

        $('html').css({ cursor: '' });
    }

    function beginToggleButtonFade() {
        if ( $('.togglable').hasClass('hidden')) {
            fadeTimeout = setTimeout( function(){
                $( '.fade' ).fadeOut(fadeOutSpeed, function() {
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
            }
        }
    }

});