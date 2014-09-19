define([ 'jquery', 'atom' ], function( $, atom ) {
    return {
        update: function() {
            var selectedAtom = atom.getAtoms()[0];

            $( '#selected-atom-direction').text( selectedAtom.direction );
        }
    }
});