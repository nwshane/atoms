atom = function() {
    function random( min, max ) {
        return (Math.random() * (1 + max - min)) + min;
    }

    var minRadius = 20;
    var maxRadius = 20;

    var minSpeed = 50;
    var maxSpeed = 150;

    return {
        atoms: [],
        Atom: function() {
            this.radius = random( minRadius, maxRadius );
            this.color = "rgb(0,0,0)";
            this.speed = random ( minSpeed, maxSpeed );
            this.direction = random( 0, 2 * Math.PI );

            var minX = this.radius;
            var maxX = sim.w - this.radius;
            this.x = random( minX, maxX );

            var minY = this.radius;
            var maxY = sim.h - this.radius;
            this.y = random( minY, maxY );

            this.draw = function() {
                sim.ctx.beginPath();
                sim.ctx.fillStyle = this.color;
                sim.ctx.arc( this.x, this.y, this.radius, 0, 2 * Math.PI, true );
                sim.ctx.fill();
            }

            this.move = function() {
                this.x += 0.01 * this.speed * Math.cos( this.direction );
                this.y += 0.01 * this.speed * Math.sin( this.direction );
            }
        },
        moveAtoms: function() {
            sim.ctx.clearRect( 0, 0, sim.w, sim.h );
            for ( var i = 0; i < this.atoms.length; i++ ) {
                this.atoms[i].move();
                this.atoms[i].draw();
            }
        }
    }
}();