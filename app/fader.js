define([ 'jquery' ], function( $ ){

    $('#toggle-headers-and-panels').click(function() {
        $( '#toggle-headers-and-panels').stop( true );

        $('hgroup').toggleClass('hidden');
        $('#panels').toggleClass('hidden');
    });

    var fadeOutSpeed = 1000;

    function fade() {
        if ( $('hgroup').hasClass('hidden') && $('#panels').hasClass('hidden')) {
            setTimeout( function(){
                $( '#toggle-headers-and-panels' ).fadeOut(fadeOutSpeed);
            }, 1000)
        }
    };

    $('body').mousemove( function() {
        $( '#toggle-headers-and-panels').stop( true );
        $( '#toggle-headers-and-panels').css('display', '');
        $( '#toggle-headers-and-panels').css('opacity', '');

        fade();
    });

    fade();

});