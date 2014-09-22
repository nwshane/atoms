define([ 'jquery', 'atom' ], function( $, atom ) {
    var selectedAtom = atom.getAtoms()[0];

    function selectAtom( num ) {
        try {
            selectedAtom = atom.getAtomNumber( num )
        } catch( error ) {
            alert( 'Error: ' + error );
        }

        $('#atom-display').removeClass( 'hidden' )
    }

    $('#select-atom').click( function() {
        selectAtom( parseInt( $('#select-atom-number-input').val() ));
    });

    return {
        update: function() {
            $( '#selected-atom-direction').text( selectedAtom.direction );
        }
    }
});