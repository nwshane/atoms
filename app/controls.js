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
        input.focusOnNumberInput();
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

    function selectUnselectAtom() {
        input.setInputKeyupFunction(display.selectUnselectAtomById);
        input.focusOnNumberInput();
    }

    $('#select-unselect-atom').click(function () {
        selectUnselectAtom();
    });

    $(document).bind('keyup', 's', function () {
        selectUnselectAtom();
    });

    function clickSelectAtom(event) {
        var x = event.pageX;
        var y = event.pageY;

        var atoms = atom.getAtoms();

        for ( var i = 0; i < atoms.length; i++ ) {
            if ( atoms[i].contains( x, y )) {
                atom.toggleSelectAtom( atoms[i] );
            }
        }

        display.update();
    }

    $('canvas')[0].addEventListener('click', function(event) {
        clickSelectAtom(event)
    }, false);

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