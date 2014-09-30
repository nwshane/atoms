define([ 'jquery', 'atom', 'error' ], function( $, atom, error ) {
    function selectAtom( newlySelectedAtom ) {
        atom.unselectAtoms();
        newlySelectedAtom.selected = true;
        atom.drawAtoms();

        $('#display').removeClass( 'hidden' );
        update();
    }

    $('canvas')[0].addEventListener('click', function(event) {
        var x = event.pageX;
        var y = event.pageY;

        var atoms = atom.getAtoms();

        for ( var i = 0; i < atoms.length; i++ ) {
            if ( atoms[i].contains( x, y )) {
                selectAtom( atoms[i] );
            }
        }
    }, false)

    function updateDisplayProperty( selectedAtom, property ) {
        var value = selectedAtom[property];
        if (property === 'direction') {
            value = value * ( 180 / Math.PI )
        }
        $( '#selected-atom-' + property ).text( Math.round( value ));
    }

    function update() {
        var propertiesToUpdate = [ 'id', 'radius', 'x', 'y', 'direction', 'speed' ]
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
        selectAtomById: function( id ) {
            try {
                var success = true;
                var newlySelectedAtom = atom.getAtomById( id );
            } catch( errorMessage ) {
                success = false;
                error.create( errorMessage );
            } if ( success ) {
                selectAtom( newlySelectedAtom );
            }
        },

        update: function() {
            update();
        }
    };
});