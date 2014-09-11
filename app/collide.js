collide = function() {
    function collideWall( atom ) {
        // Left wall
        if ( atom.x - atom.radius < 0 ) {
            atom.direction = Math.PI - atom.direction;
        }

        // Right wall
        if ( atom.x + atom.radius > sim.getW() ) {
            atom.direction = Math.PI - atom.direction;
        }

        // Top wall
        if ( atom.y - atom.radius < 0 ) {
            atom.direction = -1 * atom.direction;
        }

        // Bottom wall
        if ( atom.y + atom.radius > sim.getH() ) {
            atom.direction = -1 * atom.direction;
        }
    }

    return {
        collide: function() {
            var atoms = atom.getAtoms();

            for (var i = 0; i < atoms.length; i++ ) {
                var atom1 = atoms[i]
                collideWall( atom1 );
            }
        }
    }
}();