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
            sim.ctx.fillStyle = "rgb(200,0,0)";
            sim.ctx.fillRect( .25 * sim.w, .25 * sim.h, .3 * sim.w, .3 * sim.h );

            sim.ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
            sim.ctx.fillRect( .75 * sim.w, .75 * sim.h, -.3 * sim.w, -.3 * sim.h );
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