define([ 'jquery' ], function( $ ) {
    var errorIdIterator = 1;

    function fade(errorId) {
        setTimeout( function() {
            $('#' + errorId).fadeOut(2000, function() {
                this.remove();
            });
        }, 2000);
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