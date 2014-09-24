define([ 'jquery' ], function( $ ){
    var elements = ['hgroup', '#panels'];

    var fadeOutSpeed = 1000;

    function fade() {
        setTimeout( function(){
            $.each( elements, function( index, element ) {
                $( element ).fadeOut(fadeOutSpeed);
            });
        }, 1000)

    }

    $('body').mousemove( function() {
        $.each( elements, function( index, element ) {
            $(element).stop( true );
            $(element).css('display', '');
            $(element).css('opacity', '');
        })
    });

    $('canvas').mousemove()

    fade();

});