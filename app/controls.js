define([ 'jquery', 'sim', 'atom', 'collide', 'display' ], function( $, sim, atom, collide, display ) {
    var interval;

    function createNewInstance() {
        var ctx = sim.getCtx();
        collide.collide();
        atom.moveAtoms();
        atom.drawAtoms();
        display.update();
    }

    function beginInterval() {
        interval = setInterval( createNewInstance, sim.getIntervalLengthMs() );
    }

    function stopInterval() {
        clearInterval( interval );
    }

    function playPause() {
        var $button = $('#play-pause');
        if ( $button.text() === 'Play Simulation' ) {
            beginInterval();
            $button.text( 'Pause Simulation' );
        } else {
            stopInterval();
            $button.text( 'Play Simulation' );
        }
    }

    $('#play-pause').click(function(){
        playPause();
    });

    $(document).bind('keyup', 'space', function() {
        playPause();
    });

    $('#create-atoms').click(function(){
        var numberAtoms = $( '#create-atom-number-input' ).val();
        var atoms = atom.getAtoms();

        for (var i = 0; i<numberAtoms; i++) {

            try {
                var newAtom = new atom.Atom();
            } catch( error ) {
                alert( 'Error: ' + error );
                return;
            }
            atoms.push( newAtom );
            newAtom.draw();
        }
    });
});