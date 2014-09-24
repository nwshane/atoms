requirejs.config({
    baseUrl: 'app/',
    paths: {
        jquery: '../bower_components/jquery/dist/jquery.min'
    }
});

require([ 'jquery', 'atom', 'controls', 'fader' ]);