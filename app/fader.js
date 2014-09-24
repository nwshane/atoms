define([ 'jquery' ], function( $ ){
    var fadeOutSpeed = 2000;

    function fade() {
        $('hgroup').fadeOut( fadeOutSpeed );
        $('#panels').fadeOut( fadeOutSpeed );
    }

    fade();
});