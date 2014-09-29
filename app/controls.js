define([ 'jquery', 'sim', 'atom', 'collide', 'display'], function ($, sim, atom, collide, display) {
    var interval;

    function createNewInstance() {
        var ctx = sim.getCtx();
        collide.collide();
        atom.moveAtoms();
        atom.drawAtoms();
        display.update();
    }

    function beginInterval() {
        interval = setInterval(createNewInstance, sim.getIntervalLengthMs());
    }

    function stopInterval() {
        clearInterval(interval);
    }

    function playPause() {
        var $button = $('#play-pause');
        if ($button.html() === 'Play Simulation <span class="shortcut">spacebar</span>') {
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
});