


function initialize() {
    var canvas = document.getElementById( 'simulation' );

    if (canvas.getContext) {
        var ctx = canvas.getContext( '2d' );
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        w = ctx.canvas.width;
        h = ctx.canvas.height;
    } else {
        // canvas unsupported code here
    }
}

function draw() {
    var canvas = document.getElementById( 'simulation' );
    var ctx = canvas.getContext( '2d' );

    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect( .25 * w,.25 * h,.3 * w,.3 * h );

    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    ctx.fillRect( .75 * w,.75 * h,-.3 * w,-.3 * h );
}

