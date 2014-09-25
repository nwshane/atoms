define([ 'jquery' ], function( $ ){
    var fadeTimeout;
    var fadeOutSpeed = 1000;

    function reset() {
        $( '#toggle-headers-and-panels').stop( true );
        clearTimeout( fadeTimeout );

        $( '#toggle-headers-and-panels').css('display', '');
        $( '#toggle-headers-and-panels').css('opacity', '');
        $('html').css({ cursor: '' });
    }

    $('#toggle-headers-and-panels').click(function() {
        reset();

        $('hgroup').toggleClass('hidden');
        $('#panels').toggleClass('hidden');
    });

    function fade() {
        if ( $('hgroup').hasClass('hidden') && $('#panels').hasClass('hidden')) {
            fadeTimeout = setTimeout( function(){
                $( '#toggle-headers-and-panels' ).fadeOut(fadeOutSpeed, function() {
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