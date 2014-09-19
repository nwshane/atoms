define([ 'jquery', 'sim', 'atom', 'collide' ], function( $, sim, atom, collide ) {
    $('#show-controls').click(function(){
        $( '#togglable-controls' ).toggleClass( 'hidden' );
    });

    var interval;

    function createNewInstance() {
        var ctx = sim.getCtx();
        ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height );
        collide.collide();
        atom.moveAtoms();
    }

    function beginInterval() {
        interval = setInterval( createNewInstance, sim.getIntervalLengthMs() );
    }

    function stopInterval() {
        clearInterval( interval );
    }

    $('#play-pause').click(function(){
        if ( $( event.target ).text() === 'Play Simulation' ) {
            beginInterval();
            $( event.target ).text( 'Pause Simulation' );
        } else {
            stopInterval();
            $( event.target).text( 'Play Simulation' );
        }
    });

    $('#create-atoms').click(function(){
        var numberAtoms = $( '#create-atom-number-input' ).val();
        var atoms = atom.getAtoms();

        for (var i = 0; i<numberAtoms; i++) {

            try {
                var newAtom = new atom.Atom( atoms.length + 1 );
            } catch( error ) {
                alert( 'Error: ' + error );
                return;
            }
            atoms.push( newAtom );
            newAtom.draw();
        }
    });
});