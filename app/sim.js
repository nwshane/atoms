define([ 'jquery' ], function( $ ){
    var canvas = $( 'canvas' ).get(0);

    // If canvas is unsupported...
    if ( !canvas.getContext ) {
        return {
        }
    }

    var ctx = canvas.getContext( '2d' );
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    var intervalLengthMs = 10;

    return {
        getCtx: function() {
            return ctx;
        },
        getW: function() {
            return ctx.canvas.width;
        },
        getH: function() {
            return ctx.canvas.height;
        },
        getIntervalLengthMs: function() {
            return intervalLengthMs;
        }
    }
});