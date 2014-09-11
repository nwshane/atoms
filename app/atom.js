atom = function() {
    var atoms = [];

    var minRadius = 20;
    var maxRadius = 20;

    var minSpeed = 50;
    var maxSpeed = 150;

    function random( min, max ) {
        return (Math.random() * (1 + max - min)) + min;
    }

    return {
        getAtoms: function() {
            return atoms;
        },
        Atom: function() {
            this.radius = random( minRadius, maxRadius );
            this.mass = Math.PI * this.radius * this.radius;
            this.color = "rgb(0,0,0)";
            this.speed = random ( minSpeed, maxSpeed );
            this.direction = random( 0, 2 * Math.PI );

            var minX = this.radius;
            var maxX = sim.getW() - this.radius;
            this.x = random( minX, maxX );

            var minY = this.radius;
            var maxY = sim.getH() - this.radius;
            this.y = random( minY, maxY );

            this.draw = function() {
                var ctx = sim.getCtx();
                ctx.beginPath();
                ctx.fillStyle = this.color;
                ctx.arc( this.x, this.y, this.radius, 0, 2 * Math.PI, true );
                ctx.fill();
            };

            this.move = function() {
                var intervalLengthMs = sim.getIntervalLengthMs();
                this.x += intervalLengthMs/1000 * this.speed * Math.cos( this.direction );
                this.y += intervalLengthMs/1000 * this.speed * Math.sin( this.direction );
            };
        },
        moveAtoms: function() {
            for ( var i = 0; i < atoms.length; i++ ) {
                atoms[i].move();
                atoms[i].draw();
            }
        },
        distance: function( atom1, atom2 ) {
            var xDist = atom1.x - atom2.x;
            var yDist = atom1.y - atom2.y;

            return Math.sqrt( xDist * xDist + yDist * yDist );
        }
    }
}();