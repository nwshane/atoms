sim = function () {
    var canvas = $( '#simulation').get(0);

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

    var atoms = [];

    function Atom() {
        this.radius = 20;

        var minX = this.radius;
        var maxX = w - this.radius;
        this.x = Math.random() * (1 + maxX - minX) + minX;

        var minY = this.radius;
        var maxY = h - this.radius;
        this.y = Math.random() * (1 + maxY - minY) + minY;

        this.draw = function() {
            ctx.beginPath();
            ctx.arc( this.x, this.y, this.radius, 0, 2 * Math.PI, true );
            ctx.fill();
        }
    }

    return {
        toggle_controls: function() {
            $( '#controls' ).toggleClass( 'hidden' );
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
                var newAtom = new Atom();
                atoms.push( newAtom );
                newAtom.draw();
            }
        }
    }
}();


