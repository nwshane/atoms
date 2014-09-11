sim = function(){
    var canvas = $( '#simulation').get(0);

    // If canvas is unsupported...
    if ( !canvas.getContext ) {
        return {
        }
    }

    $.getScript( 'app/atom.js' );
    $.getScript( 'app/controls.js' );

    var ctx = canvas.getContext( '2d' );
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    var interval;
    var intervalLengthMs = 10;

    function createNewInstance() {
        ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height );
        atom.collide();
        atom.moveAtoms();






    }

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
        },
        beginInterval: function() {
            interval = setInterval( createNewInstance, intervalLengthMs );
        },
        stopInterval: function() {
            clearInterval( interval );
        }
    }
}();


