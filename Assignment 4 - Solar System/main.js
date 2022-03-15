

var gl;

function init() {
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
   
    earth = new Sphere();
    sun = new Sphere();
    moon = new Sphere();
    sun.color = vec4(1, 1, 0, 1);
    earth.color = vec4(0, 1, 1, 1);
    moon.color = vec4(0,1,1,0);
    earth.radius = 2;
    sun.radius = 4;
    moon.radius = 1;
    earth.orbit = 15;
    moon.orbit = 4;
    near = 10;
    D = 2 * (earth.orbit + moon.orbit + moon.radius);
    far = near + D;
    tan = (D / 2) / (near + (D / 2)); 
    fovy = 2*Math.atan(tan) * 180;
    Perspective = perspective(fovy, 1.0, near, far);
    earth.P = Perspective;
    sun.P = Perspective;
    moon.P = Perspective;
    view = translate(0, 0, -.5 * (near + far));
    time = 0;

    requestAnimationFrame(render);
}

function render() {

    // Update your motion variables here
    time += 1;


    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    
    // Add your rendering sequence here
    ms = new MatrixStack();
    ms.load(view);
    ms.push();
    ms.scale(sun.radius);
    sun.MV = ms.current();
    sun.render();
    ms.pop();

    ms.load(view);
    ms.push();
    ms.rotate(time, [0, 1, 0]);
    ms.translate(earth.orbit, 0, 0);
    ms.push();
    ms.scale(earth.radius);
    earth.MV = ms.current();
    earth.render();
    ms.pop();
    ms.rotate(time * 24, [0,1,0]);
    ms.translate(moon.orbit, 0, 0);
    ms.push();
    ms.scale(moon.radius);
    moon.MV = ms.current();
    moon.render();
    ms.pop();


    requestAnimationFrame(render);
}

window.onload = init;