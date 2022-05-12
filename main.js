var gl;

// function loadTexture(image, texture){
    
// }

function init() {
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    function initTexture (url) {
        let texture = gl.createTexture();
        texImage = new Image();
        texImage.onload = function () {
            loadTexture(texImage, texture);
        };
        texImage.src = url;
        return texture;
    }
    function loadTexture(image, texture) { 
        gl.bindTexture(gl.TEXTURE_2D, texture); 
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,  
            gl.RGBA, gl.UNSIGNED_BYTE, image); 
        gl.texParameteri(gl.TEXTURE_2D,    
            gl.TEXTURE_MAG_FILTER, gl.LINEAR); 
        gl.texParameteri(gl.TEXTURE_2D, 
            gl.TEXTURE_MIN_FILTER,  
            gl.LINEAR_MIPMAP_NEAREST); 
        gl.generateMipmap(gl.TEXTURE_2D); 
        gl.bindTexture(gl.TEXTURE_2D, null); 
    }
    earthTexture = initTexture("01-3.jpeg");
    saturnTexture = initTexture("8k_saturn.jpeg")
    earth = new textureSphere();
    sun = new Sphere();
    moon = new Sphere();
    mercury = new Sphere();
    venus = new Sphere();
    mars = new Sphere();
    jupiter = new Sphere();
    saturn = new textureSphere();
    uranus = new Sphere();
    neptune = new Sphere();
    saturnRing = new Disk(36, 0);

    sun.color = vec4(1, 1, 0, 1);
    earth.color = vec4(0, 1, 1, 1);
    mercury.color = vec4(0.5, 0.5, 0.5, 1);
    moon.color = vec4(0,1,1,0);
    venus.color = vec4(0.972, 0.971, 0.691, 1);
    mars.color = vec4(1, 0, 0, 1);
    jupiter.color = vec4(0.784, 0.434, 0.344, 1);
    saturn.color = vec4(0.748, 0.775, 0.183, 1);
    uranus.color = vec4(0, 0, 1, 1);
    neptune.color = vec4(0.366, 0.765, 0.972, 1);
    saturnRing.color = vec4(0.5, 0.5, 0.5, 1);

    earth.tex = 0;
    
    earth.radius = 2;
    venus.radius = 1.75
    sun.radius = 4;
    mercury.radius = 1.25;
    moon.radius = 1;
    mars.radius = 1.5;
    jupiter.radius = 3;
    saturn.radius = 2.75;
    uranus.radius = 2.5;
    neptune.radius = 2.25;
    saturnRing.radius = 6;

    earth.orbit = 15;
    moon.orbit = 4;
    mercury.orbit = 6;
    venus.orbit = 10;
    mars.orbit = 22;
    jupiter.orbit = 27;
    saturn.orbit = 34;
    uranus.orbit = 42;
    neptune.orbit = 51;

    near = 10;
    D = 2 * (neptune.orbit + neptune.radius);
    far = near + D;
    tan = (D / 2) / (near + (D / 2)); 
    fovy = 2*Math.atan(tan) * 180;
    Perspective = perspective(fovy, 1.0, near, far);
    earth.P = Perspective;
    sun.P = Perspective;
    moon.P = Perspective;
    mercury.P = Perspective;
    venus.P = Perspective;
    mars.P = Perspective;
    jupiter.P = Perspective;
    saturn.P = Perspective;
    uranus.P = Perspective;
    neptune.P = Perspective;
    saturnRing.P = Perspective;
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
    //sun
    ms.load(view);
    ms.push();
    ms.scale(sun.radius);
    sun.MV = ms.current();
    sun.render();
    ms.pop();
    //earth
    ms.load(view);
    ms.push();
    ms.rotate(time, [0, 1, 0]);
    ms.translate(earth.orbit, 0, 0);
    ms.push();
    ms.scale(earth.radius);
    earth.MV = ms.current();
    gl.bindTexture(gl.TEXTURE_2D, earthTexture);
    earth.render();
    gl.bindTexture(gl.TEXTURE_2D, null);
    ms.pop();
    //moon
    ms.rotate(time * 24, [0,1,0]);
    ms.translate(moon.orbit, 0, 0);
    ms.push();
    ms.scale(moon.radius);
    moon.MV = ms.current();
    moon.render();
    ms.pop();
    //mercury
    ms.load(view);
    ms.push();
    ms.rotate(time * 4, [0, 1, 0]);
    ms.translate(mercury.orbit, 0, 0);
    ms.scale(mercury.radius);
    mercury.MV = ms.current();
    mercury.render();
    ms.pop();
    //venus
    ms.load(view);
    ms.push();
    ms.rotate(time * 1.5, [0, 1, 0]);
    ms.translate(venus.orbit, 0, 0);
    ms.scale(venus.radius);
    venus.MV = ms.current();
    venus.render();
    ms.pop();
    //mars
    ms.load(view);
    ms.push();
    ms.rotate(time * 1/2, [0, 1, 0]);
    ms.translate(mars.orbit, 0, 0);
    ms.scale(mars.radius);
    mars.MV = ms.current();
    mars.render();
    ms.pop();
    //jupiter
    ms.load(view);
    ms.push();
    ms.rotate(time * 1/12, [0, 1, 0]);
    ms.translate(jupiter.orbit, 0, 0);
    ms.scale(jupiter.radius);
    jupiter.MV = ms.current();
    jupiter.render();
    ms.pop();
    //saturn
    ms.load(view);
    ms.push();
    ms.rotate(time * 1/29, [0,1,0])
    ms.translate(saturn.orbit, 0, 0);
    ms.push();
    ms.scale(saturn.radius);
    saturn.MV = ms.current();
    gl.bindTexture(gl.TEXTURE_2D, saturnTexture);
    saturn.render();
    gl.bindTexture(gl.TEXTURE_2D, null);
    ms.pop();
    ms.rotate(180, [1,1,1]);
    ms.scale(saturnRing.radius);
    saturnRing.MV = ms.current();
    saturnRing.render();
    ms.pop();
    //uranus
    ms.load(view);
    ms.push();
    ms.rotate(time * 1/84, [0,1,0])
    ms.translate(uranus.orbit, 0, 0);
    ms.scale(uranus.radius);
    uranus.MV = ms.current();
    uranus.render();
    ms.pop();
    //neptune
    ms.load(view);
    ms.push();
    ms.rotate(time * 1/165, [0,1,0])
    ms.translate(neptune.orbit, 0, 0);
    ms.scale(neptune.radius);
    neptune.MV = ms.current();
    neptune.render();
    ms.pop();
    requestAnimationFrame(render);
}

window.onload = init;