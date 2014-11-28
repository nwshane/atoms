define([ 'jquery', 'hotkeys', 'sim', 'atom', 'collide', 'display', 'input', 'toggleFader'], function ($, hotkeys, sim, atom, collide, display, input, toggleControls) {
    $('#toggle-all').click(function() {
        toggleControls.togglePanel();
    });

    $(document).bind('keyup', 't', function () {
        toggleControls.togglePanel();
    });

    function toggleShortcuts() {
        if ($('#shortcuts').hasClass('hidden')) {
            $('#shortcuts').removeClass('hidden');
            $('#toggle-shortcuts').text('Hide Shortcuts');
        } else {
            $('#shortcuts').addClass('hidden');
            $('#toggle-shortcuts').text('Show Shortcuts');
        }
    }

    $('#close-shortcuts').click(function() {
        toggleShortcuts();
    });

    $('#toggle-shortcuts').click(function() {
        toggleShortcuts();
    });

    $(document).bind('keyup', 'h', function () {
        toggleShortcuts();
    });

    function previousInstance() {
        createNewInstance(true);
    }

    $('#previous-instance').click(function () {
        previousInstance();
    });

    $(document).bind('keydown', 'p', function () {
        previousInstance();
    });

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
            $button.html('<img src="assets/pause.gif" alt="Play/Pause Button">');
        } else {
            stopInterval();
            $button.html('<img src="assets/play.gif" alt="Play/Pause Button">');
        }
    }

    $('#play-pause').click(function () {
        playPause();
    });

    $(document).bind('keyup', 'space', function () {
        playPause();
    });

    function createNewInstance(rewind) {
        if (rewind) {atom.reverseDirectionAll();}
        collide.collide();
        atom.moveAtoms();
        if (rewind) {atom.reverseDirectionAll();}
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
        input.setInputKeyupFunction(display.toggleAtomById);
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
    }

    $('#unselect-atoms').click(function () {
        unselectAtoms();
    });

    $(document).bind('keyup', 'u', function () {
        unselectAtoms();
    });
});