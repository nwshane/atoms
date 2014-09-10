controls = function() {
    return {
        toggle: function() {
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
                var newAtom = new sim.Atom();
                sim.atoms.push( newAtom );
                newAtom.draw();
            }
        }
    }
}();