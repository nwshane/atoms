requirejs.config({
    baseUrl: 'app/',
    paths: {
        jquery: '../bower_components/jquery/dist/jquery.min',
        hotkeys: '../bower_components/jquery.hotkeys/jquery.hotkeys'
    },
    shim: {
        hotkeys: ['jquery']
    }
});

require([ 'jquery', 'atom', 'controls', 'input' ]);