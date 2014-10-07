define([ 'atom', 'sim' ], function( atom, sim ) {
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

    function atomCollision( atom1, atom2 ) {
        var mass1 = atom1.mass;
        var mass2 = atom2.mass;

        var initialSpeed1 = atom1.speed;
        var initialSpeed2 = atom2.speed;

        var initialDirection1 = atom1.direction;
        var initialDirection2 = atom2.direction;

        /**
         1. Find the direction of the force from atom 1 on atom 2 (forceDirection1).

         --> Inverse tangent of the getDistanceBetweenEdges between the y coordinates over the getDistanceBetweenEdges
         between the x coordinates.

         --> MAKE SURE THAT ATAN YIELDS DIRECTIONS BETWEEN 0 AND 360.
         */

        var forceDirection1 = Math.atan(( atom1.y - atom2.y )/( atom1.x - atom2.x ));

        if ( atom1.x - atom2.x < 0 ) {
            forceDirection1 += Math.PI;
        }

        /**
         2. Change the frame of reference so that both forces lie in the
         x-dimension.

         O --> <-- O
         atom 1   atom 2

         --> In order to switch the frame of reference, change the direction of
         both atom.
         ----> Modify the directions by taking away forceDirection1 from both, so that
         the direction of the force of atom 1 on atom 2 is 0, and the direction of the
         force of atom 2 on atom 1 is 180

         --> The prefix "mod" in a variable name means that it is in the new frame of
         reference.
         */

        var modInitialDirection1 = initialDirection1 - forceDirection1;
        var modInitialDirection2 = initialDirection2 - forceDirection1;

        /**
         3. Calculate the x-velocities and y-velocities of the atoms in the new
         frame of reference.
         */

        var modInitialXVelocity1 = Math.cos( modInitialDirection1 ) * initialSpeed1;
        var modInitialYVelocity1 = Math.sin( modInitialDirection1 ) * initialSpeed1;

        var modInitialXVelocity2 = Math.cos( modInitialDirection2) * initialSpeed2;
        var modInitialYVelocity2 = Math.sin( modInitialDirection2) * initialSpeed2;

        /**
         4. Find the velocities of the atoms after the collision. The y-velocities stay the
         same, so we only need to find new values for the x velocities.

         --> The equation for a one-dimensional collision...

         finalV1 = (initialV1*(m1-m2) + 2*m2*(initialV2)) / (m1+m2)

         --> ...applied to x velocities:
         */

        var modFinalXVelocity1 = ( modInitialXVelocity1 * ( mass1 - mass2 ) + 2 * mass2 * modInitialXVelocity2 )/( mass1 + mass2 );
        var modFinalXVelocity2 = ( modInitialXVelocity2 * ( mass2 - mass1 ) + 2 * mass1 * ( modInitialXVelocity1 ))/( mass2 + mass1 );

        /**
         5. Use the new velocities of the atoms to find the final directions in this frame of
         reference.

         --> The equation for the new direction is the inverse tangent of the new x Velocity
         divided by the old y Velocity
         */

        var modFinalDirection1 = Math.atan( modInitialYVelocity1 / modFinalXVelocity1 );
        var modFinalDirection2 = Math.atan( modInitialYVelocity2 / modFinalXVelocity2 );

        // If getXVelocity is negative, then the final directions will be off by 180 degrees, due to
        // the inverse tangent function. The below if statement corrects that error.
        if ( modFinalXVelocity1 < 0 )
        {
            modFinalDirection1 += Math.PI;
        }

        if ( modFinalXVelocity2 < 0 )
        {
            modFinalDirection2 += Math.PI;
        }

        /**
         6. Find the final directions of the atoms by reconverting to the original frame of
         reference.

         --> Reconvert by adding the original direction of the force from atom 1 on atom 2 to
         both the final directions.
         */

        var finalDirection1 = modFinalDirection1 + forceDirection1;
        var finalDirection2 = modFinalDirection2 + forceDirection1;

        /**
         7. Use the velocities of the atoms to find the final speeds (which are the same
         regardless of the frame of reference).

         --> The equation for the new speed use the Pythagorean Theorem, sqrt(a^2 + b^2) = c^2
         */

        var finalSpeed1 = Math.sqrt( modFinalXVelocity1 * modFinalXVelocity1 + modInitialYVelocity1 * modInitialYVelocity1 );
        var finalSpeed2 = Math.sqrt( modFinalXVelocity2 * modFinalXVelocity2 + modInitialYVelocity2 * modInitialYVelocity2 );

        // Changing Atom 1 Direction and Speed
        atom1.changeDirection(finalDirection1);
        atom1.speed = finalSpeed1;

        // Changing Atom 2 Direction and Speed
        atom2.changeDirection(finalDirection2);
        atom2.speed = finalSpeed2;
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
                    if ( atom1.overlapsWith( atom2 ) ) {
                        atomCollision( atom1, atom2 );
                    }
                }
            }
        }
    }
});