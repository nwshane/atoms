sim = function () {
    var canvas = document.getElementById( 'simulation' );

    // If canvas is unsupported...
    if ( !canvas.getContext ) {
        return {
        }
    }

    var ctx = canvas.getContext( '2d' );
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    var w = ctx.canvas.width;
    var h = ctx.canvas.height;

    return {
        toggle_controls: function() {
            document.getElementById( 'controls' ).setAttribute( 'class', 'hidden' );
        },

        drawRectangles: function () {
            ctx.fillStyle = "rgb(200,0,0)";
            ctx.fillRect( .25 * w, .25 * h, .3 * w, .3 * h );

            ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
            ctx.fillRect( .75 * w, .75 * h, -.3 * w, -.3 * h );
        },

        createAtom: function () {
            var numberAtoms = $( '#create-atom-number-input' ).val();

            for (var i = 0; i<numberAtoms; i++) {
                ctx.beginPath();

                var radius = 20;

                var minX = radius;
                var maxX = w - radius;
                var x = Math.random() * (1 + maxX - minX) + minX;

                var minY = radius;
                var maxY = h - radius;
                var y = Math.random() * (1 + maxY - minY) + minY;

                ctx.arc( x, y, radius, 0, 2 * Math.PI, true );
                ctx.fill();
            }
        }
    }
}();


