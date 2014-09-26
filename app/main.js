requirejs.config({
    baseUrl: 'app/',
    paths: {
        jquery: '../bower_components/jquery/dist/jquery.min',
        hotkeys: '../bower_components/jquery.hotkeys/jquery.hotkeys'
    }
});

require([ 'jquery', 'hotkeys', 'atom', 'controls', 'fader' ]);