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

    function getNumberFromInput() {
        $('#input-window').removeClass( 'hidden' );
        $('#number-input').focus();

        $('#number-input').bind('keyup', 'return', function() {
            return $( '#number-input' ).val();
        });
    }

    $('#create-atoms').click(function(){
        var numberToCreate = getNumberFromInput();

        atom.createAtoms( numberToCreate );
    });
});