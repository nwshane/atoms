define([ 'sim' ], function( sim ) {
    var atoms = [];

    var minRadius = 20;
    var maxRadius = 20;

    // Speed is given in pixels/second
    var minSpeed = 50;
    var maxSpeed = 150;

    function random( min, max ) {
        return (Math.random() * (1 + max - min)) + min;
    }

    return {
        getAtoms: function() {
            return atoms;
        },
        getAtomNumber: function( num ) {
            for ( var i = 0; i < atoms.length; i++ ) {
                if ( atoms[i].num === num ) {
                    return atoms[i];
                }
            }

            throw 'Atom #' + num + ' does not exist.';
        },
        Atom: function( atomNum ) {
            this.setRandomPosition = function() {
                var minX = this.radius;
                var maxX = sim.getW() - this.radius;
                this.x = random( minX, maxX );

                var minY = this.radius;
                var maxY = sim.getH() - this.radius;
                this.y = random( minY, maxY );
            }

            this.distanceFrom = function( atom2 ) {
                var xDist = this.x - atom2.x;
                var yDist = this.y - atom2.y;

                return Math.sqrt( xDist * xDist + yDist * yDist );
            }

            this.overlapsWith = function( atom2 ) {
                return (( this.radius + atom2.radius ) > this.distanceFrom( atom2 ));
            }

            this.checkNoOverlap = function() {
                for ( var i = 0; i < atoms.length; i++ ) {
                    if ( this.overlapsWith( atoms[i] )) {
                        return false;
                    }
                }

                return true;
            }

            this.changeDirection = function( newDirection ) {
                this.direction = newDirection;

                while ( this.direction < 0 ) {
                    this.direction += Math.PI * 2;
                }

                while ( this.direction > Math.PI * 2 ) {
                    this.direction -= Math.PI * 2;
                }
            }

            this.draw = function() {
                var ctx = sim.getCtx();
                ctx.beginPath();
                ctx.fillStyle = this.color;
                ctx.arc( this.x, this.y, this.radius, 0, 2 * Math.PI, true );
                ctx.fill();
                ctx.fillStyle = 'white';
                ctx.fillText( this.num, this.x, this.y )
            };

            this.move = function() {
                var intervalLengthMs = sim.getIntervalLengthMs();
                this.x += intervalLengthMs/1000 * this.speed * Math.cos( this.direction );
                this.y += intervalLengthMs/1000 * this.speed * Math.sin( this.direction );
            };

            this.num = atomNum;
            this.radius = random( minRadius, maxRadius );
            this.mass = Math.PI * this.radius * this.radius;
            this.color = "rgb(0,0,0)";
            this.speed = random ( minSpeed, maxSpeed );
            this.direction = random( 0, 2 * Math.PI );
            this.selected = false;

            var overlaps = true;
            var numTries = 0
            while ( overlaps ) {
                numTries++;
                if ( numTries === 10000 ) {
                    throw 'Not enough space for another atom.';
                }
                this.setRandomPosition();

                if ( this.checkNoOverlap() ) {
                    overlaps = false;
                }
            }
        },
        moveAtoms: function() {
            for ( var i = 0; i < atoms.length; i++ ) {
                atoms[i].move();
                atoms[i].draw();
            }
        }
    }
});