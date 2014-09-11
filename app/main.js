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

    return {
        ctx: ctx,
        w: ctx.canvas.width,
        h: ctx.canvas.height,

        beginInterval: function() {
            interval = setInterval( 'atom.moveAtoms()', 10 );
        },
        stopInterval: function() {
            clearInterval( interval );
        }
    }
}();


