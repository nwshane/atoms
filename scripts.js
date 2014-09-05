sim = function () {
    var canvas = document.getElementById( 'simulation' );

    // If canvas is unsupported...
    if ( !canvas.getContext ) {
        return {
            // canvas unsupported code here
        }
    }

    var ctx = canvas.getContext( '2d' );
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    var w = ctx.canvas.width;
    var h = ctx.canvas.height;

    return {
        draw: function() {
            ctx.fillStyle = "rgb(200,0,0)";
            ctx.fillRect( .25 * w, .25 * h, .3 * w, .3 * h );

            ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
            ctx.fillRect( .75 * w, .75 * h, -.3 * w, -.3 * h );
        }
    }
}();

