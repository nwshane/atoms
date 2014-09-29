define([ 'sim' ], function( sim ) {
    var atoms = [];

    var minRadius = 20;
    var maxRadius = 20;

    // Speed is given in pixels/second
    var minSpeed = 50;
    var maxSpeed = 150;

    var atomIdIterator = 1;

    function random( min, max ) {
        return (Math.random() * (1 + max - min)) + min;
    }

    function Atom() {
        this.setRandomPosition = function() {
            var minX = this.radius;
            var maxX = sim.getW() - this.radius;
            this.x = random( minX, maxX );

            var minY = this.radius;
            var maxY = sim.getH() - this.radius;
            this.y = random( minY, maxY );
        }

        this.distanceFrom = function( x, y ) {
            var xDist = this.x - x;
            var yDist = this.y - y;

            return Math.sqrt( xDist * xDist + yDist * yDist );
        }

        this.contains = function( x, y ) {
            if ( this.distanceFrom( x, y ) < this.radius ) {
                return true;
            } else {
                return false;
            }
        }

        this.overlapsWith = function( atom2 ) {
            return (( this.radius + atom2.radius ) > this.distanceFrom( atom2.x, atom2.y ));
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

        this.fillAtom = function( ctx ) {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc( this.x, this.y, this.radius, 0, 2 * Math.PI, true );
            ctx.fill();
        }

        this.writeId = function( ctx ) {
            ctx.fillStyle = 'white';
            ctx.fillText( this.id, this.x - 2, this.y + 2)
        }

        this.drawCircle = function( ctx, radius ) {
            ctx.beginPath();
            ctx.arc( this.x, this.y, radius, 0, 2 * Math.PI, true );
            ctx.stroke();
        }

        this.drawTarget = function( ctx ) {
            ctx.fillStyle = 'red';
            this.drawCircle( ctx, this.radius * 1.5 );
            this.drawCircle( ctx, this.radius * 2 );
            this.drawCircle( ctx, this.radius * 3 );
        }

        this.draw = function() {
            var ctx = sim.getCtx();
            this.fillAtom( ctx );
            this.writeId( ctx );

            if ( this.selected ) {
                this.drawTarget( ctx );
            }
        };

        this.move = function() {
            var intervalLengthMs = sim.getIntervalLengthMs();
            this.x += intervalLengthMs/1000 * this.speed * Math.cos( this.direction );
            this.y += intervalLengthMs/1000 * this.speed * Math.sin( this.direction );
        };

        this.id = atomIdIterator;
        atomIdIterator++;
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

        return this;
    }

    return {
        getAtoms: function() {
            return atoms;
        },
        getAtomById: function( id ) {
            for ( var i = 0; i < atoms.length; i++ ) {
                if ( atoms[i].id === id ) {
                    return atoms[i];
                }
            }

            throw 'Atom #' + id + ' does not exist.';
        },
        createAtoms: function( numberToCreate ) {
            for (var i = 0; i<numberToCreate; i++) {
                try {
                    var newAtom = new Atom();
                } catch( error ) {
                    console.log( 'Error: ' + error );
                    return;
                }
                atoms.push( newAtom );
                newAtom.draw();
            }
        },
        moveAtoms: function() {
            for ( var i = 0; i < atoms.length; i++ ) {
                atoms[i].move();
            }
        },
        drawAtoms: function() {
            var ctx = sim.getCtx();
            ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height );

            for ( var i = 0; i < atoms.length; i++ ) {
                atoms[i].draw();
            }
        }
    }
});