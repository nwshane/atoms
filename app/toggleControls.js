define([ 'jquery' ], function( $ ){
    var fadeTimeout;
    var fadeOutSpeed = 1000;
    var hidden = false;

    function reset() {
        $( '#toggle-controls').stop( true );
        clearTimeout( fadeTimeout );

        $( '#toggle-controls').css('display', '');
        $( '#toggle-controls').css('opacity', '');
        $('html').css({ cursor: '' });
    }

    function togglePanel() {
        reset();

        $('#controls').toggleClass('hidden');

        hidden = !hidden;

        if (hidden) {
            fade();
        }
    }

    $('#toggle-controls').click(function() {
        togglePanel();
    });

    $(document).bind('keydown', 't', function () {
        togglePanel();
    });

    function fade() {
        if ( $('#controls').hasClass('hidden')) {
            fadeTimeout = setTimeout( function(){
                $( '#toggle-controls' ).fadeOut(fadeOutSpeed, function() {
                    $('html').css({ cursor: 'none' });
                });
            }, 1000);
        }
    }

    $('body').mousemove( function() {
        reset();

        fade();
    });

    fade();

});