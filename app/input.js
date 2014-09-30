define([ 'jquery' ], function( $ ) {
    var inputKeyupFunction;

    function runKeyup() {
        var numberInput = parseInt( $('#number-input').val() );

        cancelNumberInput();
        inputKeyupFunction(numberInput);
    }

    $('#number-input').bind('keyup', 'return', runKeyup);

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