//# sourceURL=collide.js

collide = function() {
    function collideWall( atom1 ) {
        // Left wall
        if ( atom1.x - atom1.radius < 0 ) {
            atom1.changeDirection( Math.PI - atom1.direction );
        }

        // Right wall
        if ( atom1.x + atom1.radius > sim.getW() ) {
            atom1.changeDirection( Math.PI - atom1.direction );
        }

        // Top wall
        if ( atom1.y - atom1.radius < 0 ) {
            atom1.changeDirection( -1 * atom1.direction );
        }

        // Bottom wall
        if ( atom1.y + atom1.radius > sim.getH() ) {
            atom1.changeDirection( -1 * atom1.direction );
        }
    }

    function checkAtomOverlap( atom1, atom2 ) {
        return (( atom1.radius + atom2.radius ) > atom.distance( atom1, atom2 ));
    }

    function atomCollision( atom1, atom2 ) {

    }

    return {
        collide: function() {
            var atoms = atom.getAtoms();

            for ( var i = 0; i < atoms.length; i++ ) {
                var atom1 = atoms[i];

                collideWall( atom1 );

                // Compare the location of every atom to every other atom to check whether two atoms are colliding
                for ( var j = i + 1; j < atoms.length; j++ ) {
                    var atom2 = atoms[j];
                    if ( checkAtomOverlap( atom1, atom2 ) ) {
                        atomCollision( atom1, atom2 );
                    }
                }
            }
        }
    }
}();