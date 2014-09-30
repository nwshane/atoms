define([ 'jquery' ], function( $ ) {
    var errorIdIterator = 1;
    var lengthBeforeFade = 2000;
    var lengthOfFade = 2000;

    function fade(errorId) {
        setTimeout( function() {
            $('#' + errorId).fadeOut(lengthOfFade, function() {
                this.remove();
            });
        }, lengthBeforeFade);
    }

    return {
        create: function( errorMessage ) {
            var errorId = 'error-' + errorIdIterator;
            errorIdIterator += 1;

            $('#errors').append('<p id="' + errorId + '">' + errorMessage + '</p>');

            fade(errorId);
        }
    }
});