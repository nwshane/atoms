define([ 'jquery', 'atom' ], function( $, atom ) {
    var selectedAtom = atom.getAtoms()[0];

    function selectAtom( num ) {
        try {
            selectedAtom = atom.getAtomNumber( num )
        } catch( error ) {
            alert( 'Error: ' + error );
        }
    }

    $('#select-atom').click( function() {
        selectAtom( parseInt( $('#select-atom-number-input').val() ));
    });

    return {
        update: function() {
            if ( selectedAtom ) {
                $( '#selected-atom-direction').text( selectedAtom.direction );
            } else{
                $( '#selected-atom-direction').text( 'Unselected' );
            }
        }
    }
});