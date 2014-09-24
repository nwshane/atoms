define([ 'jquery', 'atom' ], function( $, atom ) {

    function selectAtom( newlySelectedAtom ) {
        newlySelectedAtom.selected = true;
        var atoms = atom.getAtoms();

        // Unselect previously selected atoms
        for ( var i = 0; i < atoms.length; i++ ) {
            if ( atoms[i].selected ) {
                if (atoms[i] !== newlySelectedAtom ) {
                    atoms[i].selected = false;
                }
            }
        }

        $('#atom-display').removeClass( 'hidden' );
        update();
    }

    function selectAtomByNum( num ) {
        try {
            var success = true;
            var newlySelectedAtom = atom.getAtomNumber( num );

        } catch( error ) {
            success = false;
            alert( 'Error: ' + error );
        } if ( success ) {
            selectAtom( newlySelectedAtom );
        }
    }

    $('#select-atom').click( function() {
        selectAtomByNum( parseInt( $('#select-atom-number-input').val() ));
    });

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
        var propertiesToUpdate = [ 'num', 'radius', 'x', 'y', 'direction', 'speed' ]
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
        }
    };
});