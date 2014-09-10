sim = function () {
    var canvas = $( '#simulation').get(0);

    // If canvas is unsupported...
    if ( !canvas.getContext ) {
        return {
        }
    }

    $.getScript( 'app/controls.js' );

    var minRadius = 20;
    var maxRadius = 20;

    var ctx = canvas.getContext( '2d' );
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    function random( min, max ) {
        return (Math.random() * (1 + max - min)) + min;
    }

    return {
        Atom: function() {
            this.radius = random( minRadius, maxRadius );

            var minX = this.radius;
            var maxX = ctx.canvas.width - this.radius;
            this.x = random( minX, maxX );

            var minY = this.radius;
            var maxY = ctx.canvas.height - this.radius;
            this.y = random( minY, maxY );

            this.draw = function() {
                ctx.beginPath();
                ctx.arc( this.x, this.y, this.radius, 0, 2 * Math.PI, true );
                ctx.fill();
            }
        },

        atoms: []
    }
}();


