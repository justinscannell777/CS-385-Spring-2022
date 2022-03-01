angle = 0;

function init(){
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    gl.clearColor(1,0,1,1);
    gl.enable(gl.DEPTH_TEST);
    cube = new Bunny(gl, 20);
    render();
    }
    function render(){
        angle = angle + 1;
        rotation = rotate(angle, 1, 1, 1);
        Perspective = perspective(75, 1.0, 1, 7);
        Translation = translate(0, 0, -1.1);
        cube.MV = mult(Translation, rotation);
        cube.P = Perspective;
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        cube.render();
        requestAnimationFrame(render);
    }
    window.onload = init;