define([ 'jquery' ], function( $ ){
    var fadeTimeout;
    var fadeOutSpeed = 1000;
    var hidden = false;

    function makeToggleButtonVisible() {
        clearTimeout( fadeTimeout );

        $( '#toggle-controls').stop( true );
        $( '#toggle-controls').css('display', '');
        $( '#toggle-controls').css('opacity', '');

        $( 'hgroup').stop( true );
        $( 'hgroup').css('display', '');
        $( 'hgroup').css('opacity', '');

        $('html').css({ cursor: '' });
    }

    function beginToggleButtonFade() {
        if ( $('#togglable-controls').hasClass('hidden')) {
            fadeTimeout = setTimeout( function(){
                $( '#toggle-controls' ).fadeOut(fadeOutSpeed, function() {
                    $('html').css({ cursor: 'none' });
                });
                $( 'hgroup' ).fadeOut(fadeOutSpeed, function() {
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
            $('#togglable-controls').toggleClass('hidden');

            hidden = !hidden;

            if (hidden) {
                beginToggleButtonFade();
            }
        }
    }

});