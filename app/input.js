define([ 'jquery', 'atom', 'display' ], function( $, atom, display ) {
    function cancelNumberInput() {
        $('#number-input').val('');
        $('#number-input').addClass('hidden');
    }

    $('#number-input').bind('keyup', 'esc', function () {
        cancelNumberInput();
    });

    $('#number-input').focusout(function () {
        cancelNumberInput();
    });

    var inputKeyupFunction;

    function runKeyup() {
        var numberInput = parseInt( $('#number-input').val() );

        cancelNumberInput();
        inputKeyupFunction(numberInput);
    }

    $('#number-input').bind('keyup', 'return', runKeyup);

    return {
        setInputKeyupFunction: function( newFunction ) {
            inputKeyupFunction = newFunction;
        },
        runNumberInputFunction: function() {
            $('#number-input').removeClass('hidden');
            $('#number-input').focus();
        }
    }

});