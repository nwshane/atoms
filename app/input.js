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

    function runNumberInputFunction() {
        $('#number-input').removeClass('hidden');
        $('#number-input').focus();
    }

    $('#create-atoms').click(function () {
        inputKeyupFunction = atom.createAtoms;
        runNumberInputFunction();
    });

    $(document).bind('keyup', 'c', function () {
        inputKeyupFunction = atom.createAtoms;
        runNumberInputFunction();
    });

    $('#select-atom').click(function () {
        inputKeyupFunction = display.selectAtomById;
        runNumberInputFunction();
    });

    $(document).bind('keyup', 's', function () {
        inputKeyupFunction = display.selectAtomById;
        runNumberInputFunction();
    });
});