define([ 'jquery', 'hotkeys', 'error' ], function( $, hotkeys, error ) {
    var inputKeyupFunction;

    function runKeyup() {
        var numberInput = parseInt( $('#number-input').val() );
        closeNumberInput();
        if (isNaN(numberInput)) {
            error.create('Please enter a valid number value.');
            return;
        } else {
            inputKeyupFunction(numberInput);
        }
    }

    $('#number-input').bind('keyup', 'return', runKeyup);

    function closeNumberInput() {
        $('#number-input').val('');
        $('#number-input').addClass('hidden');
    }

    $('#number-input').bind('keyup', 'esc', function () {
        closeNumberInput();
    });

    $('#number-input').focusout(function () {
        closeNumberInput();
    });

    return {
        setInputKeyupFunction: function( newFunction ) {
            inputKeyupFunction = newFunction;
        },
        focusOnNumberInput: function() {
            $('#number-input').removeClass('hidden');
            $('#number-input').focus();
        }
    }
});