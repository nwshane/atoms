define([ 'jquery', 'atom', 'error' ], function( $, atom, error ) {

    function updateDisplayProperty( selectedAtom, property ) {
        var value = selectedAtom[property];
        if (property === 'direction') {
            value = value * ( 180 / Math.PI )
        }

        $( '#display-atom-' + selectedAtom.id).find( 'span.atom-' + property ).text( Math.round( value ));
    }

    function update() {
        var propertiesToUpdate = [ 'id', 'radius', 'x', 'y', 'direction', 'speed' ];
        var atoms = atom.getAtoms();

        // Update display with properties of selected atom
        for ( var i = 0; i < atoms.length; i++ ) {
            if ( atoms[i].selected ) {
                for (var j = 0; j < propertiesToUpdate.length; j++ ) {
                    updateDisplayProperty( atoms[i], propertiesToUpdate[j] )
                }
            }
        }
    }

    return {
        update: function() {
            update();
        },
        toggleAtomById: function(id) {
            try {
                var chosenAtom = atom.getAtomById( id );
            } catch( errorMessage ) {
                error.create( errorMessage );
                return;
            }
            atom.toggleSelectAtom(chosenAtom);

            update();
        }
    };
});