define([ 'jquery', 'sim', 'atom', 'collide', 'display', 'input'], function ($, sim, atom, collide, display, input) {
    var interval;
    var playing = false;

    function beginInterval() {
        interval = setInterval(createNewInstance, sim.getIntervalLengthMs());
    }

    function stopInterval() {
        clearInterval(interval);
    }

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

    function createNewInstance() {
        var ctx = sim.getCtx();
        collide.collide();
        atom.moveAtoms();
        atom.drawAtoms();
        display.update();
    }

    $('#next-instance').click(function() {
        createNewInstance();
    });

    $(document).bind('keydown', 'n', function () {
        createNewInstance();
    });

    function createAtoms() {
        input.setInputKeyupFunction(atom.createAtoms);
        input.runNumberInputFunction();
    }

    $('#create-atoms').click(function () {
        createAtoms();
    });

    $(document).bind('keyup', 'c', function () {
        createAtoms();
    });

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

    function selectAtom() {
        input.setInputKeyupFunction(display.selectAtomById);
        input.runNumberInputFunction();
    }

    $('#select-atom').click(function () {
        selectAtom();
    });

    $(document).bind('keyup', 's', function () {
        selectAtom();
    });

    function unselectAtoms() {
        atom.unselectAtoms();
        atom.drawAtoms();
        display.update();
        $('#display').addClass( 'hidden' );
    }

    $('#unselect-atoms').click(function () {
        unselectAtoms();
    });

    $(document).bind('keyup', 'u', function () {
        unselectAtoms();
    });
});