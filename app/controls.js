define([ 'jquery', 'sim', 'atom', 'collide', 'display'], function ($, sim, atom, collide, display) {
    var interval;
    var playing = false;

    function createNewInstance() {
        var ctx = sim.getCtx();
        collide.collide();
        atom.moveAtoms();
        atom.drawAtoms();
        display.update();
    }

    $(document).bind('keydown', 'n', function () {
        createNewInstance();
    });

    $('#next-instance').click(function() {
        createNewInstance();
    });

    $(document).bind('keydown', 'n', function () {
        createNewInstance();
    });

    function beginInterval() {
        interval = setInterval(createNewInstance, sim.getIntervalLengthMs());
    }

    function stopInterval() {
        clearInterval(interval);
    }

    function resetSimulation() {
        if (playing) {
            playPause();
        }
        atom.removeAllAtoms();
        atom.drawAtoms();
        atom.resetIdIterator();
    }

    $('#reset-simulation').click(function () {
        resetSimulation();
    });

    $(document).bind('keyup', 'r', function () {
        resetSimulation();
    });

    function playPause() {
        playing = !playing;

        var $button = $('#play-pause');
        if (playing) {
            beginInterval();
            $button.html('Pause Simulation <span class="shortcut">spacebar</span>');
        } else {
            stopInterval();
            $button.html('Play Simulation <span class="shortcut">spacebar</span>');
        }
    }

    $('#play-pause').click(function () {
        playPause();
    });

    $(document).bind('keyup', 'space', function () {
        playPause();
    });

    function unselect() {
        atom.unselectAtoms();
        atom.drawAtoms();
        display.update();
        $('#display').addClass( 'hidden' );
    }

    $('#unselect-atoms').click(function () {
        unselect();
    });

    $(document).bind('keyup', 'u', function () {
        unselect();
    });
});