controls = function() {
    return {
        toggle: function() {
            $( '#controls' ).toggleClass( 'hidden' );
        },

        playPause: function() {
            if ( $( event.target ).text() === 'Play Simulation' ) {
                sim.beginInterval();
                $( event.target ).text( 'Pause Simulation' );
            } else {
                sim.stopInterval();
                $( event.target).text( 'Play Simulation' );
            }
        },

        drawRectangles: function () {
            var ctx = sim.getCtx();
            var w = sim.getW();
            var h = sim.getH();
            ctx.fillStyle = "rgb(200,0,0)";
            ctx.fillRect( .25 * w, .25 * h, .3 * w, .3 * h );

            ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
            ctx.fillRect( .75 * w, .75 * h, -.3 * w, -.3 * h );
        },

        createAtom: function () {
            var numberAtoms = $( '#create-atom-number-input' ).val();

            for (var i = 0; i<numberAtoms; i++) {
                var newAtom = new atom.Atom();
                atom.getAtoms().push( newAtom );
                newAtom.draw();
            }
        }
    }
}();