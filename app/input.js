define([ 'jquery' ], function( $ ) {
    var inputKeyupFunction;

    function runKeyup() {
        var numberInput = parseInt( $('#number-input').val() );

        closeNumberInput();
        inputKeyupFunction(numberInput);
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