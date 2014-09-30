define([ 'jquery', 'atom' ], function( $, atom ) {

    function updateDisplayProperty( selectedAtom, property ) {
        var value = selectedAtom[property];
        if (property === 'direction') {
            value = value * ( 180 / Math.PI )
        }
        $( '#selected-atom-' + property ).text( Math.round( value ));
    }

    function update() {
        var propertiesToUpdate = [ 'id', 'radius', 'x', 'y', 'direction', 'speed' ];
        var atoms = atom.getAtoms();

        // Update display with properties of selected atom
        for ( var i = 0; i < atoms.length; i++ ) {
            if ( atoms[i].selected ) {
                // If atom's display does not exist yet, create it
                if (!($('#display-atom-' + atoms[i].id).length)) {
                    $('#display').append('<div id="display-atom-' + atoms[i].id + '"><h3>ATOM #<span id="selected-atom-id"></span></h3><p>Radius: <span id="selected-atom-radius"></span></p><p>Coordinates: (<span id="selected-atom-x"></span>, <span id="selected-atom-y"></span>)</p><p>Direction: <span id="selected-atom-direction"></span>&deg;</p><p>Speed: <span id="selected-atom-speed"></span> px/s</p></div>');
                }

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
        selectAtomById: function(id) {
            atom.selectAtomById(id);
            update();
        }
    };
});