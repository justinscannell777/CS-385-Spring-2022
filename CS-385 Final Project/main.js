var gl;
var angle = 0;
// function loadTexture(image, texture){
    
// }

function init() {
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    function initTexture (url) {
        let texture = gl.createTexture();
        let texImage = new Image();
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
    sunTexture = initTexture("suntexture.jpeg");
    earthTexture = initTexture("01-3.jpeg");
    saturnTexture = initTexture("8k_saturn.jpeg");
    neptuneTexture = initTexture("neptuneTexture.jpeg");
    uranusTexture = initTexture("uranustexture.jpeg");
    marsTexture = initTexture("marsTexture.jpeg");
    moonTexture = initTexture("moonTexture.jpeg");
    mercuryTexture = initTexture("mercuryTexture.jpeg");
    venusTexture = initTexture("venusTexture.jpeg");
    jupiterTexture = initTexture("jupiterTexture.jpeg");
    earth = new textureSphere();
    //earth = new Sphere();
    //sun = new Sphere();
    sun = new textureSphere();
    moon = new textureSphere();
    mercury = new textureSphere();
    venus = new textureSphere();
    mars = new textureSphere();
    jupiter = new textureSphere();
    saturn = new textureSphere();
    //saturn = new Sphere();
    //uranus = new Sphere();
    uranus = new textureSphere();
    neptune = new textureSphere();
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
    saturn.tex = 0;
    uranus.tex = 0;
    sun.tex = 0;

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
    originalView = translate(0, 0, -.5 * (near + far));
    time = 0;
    
    window.onkeyup = function (event){
        switch (event.key){
            case 'w': angle += 2; console.log("button pressed"); break;
        }
    };
    window.onkeydown = function (event){
        switch (event.key){
            case 's': angle -= 2; break;
        }
    };
    requestAnimationFrame(render);
}

function render() {

    // Update your motion variables here
    time += 1;


    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    
    // Add your rendering sequence here
    ms = new MatrixStack();
    view = mult(originalView, rotateX(angle));
    //sun
    ms.load(view);
    ms.push();
    ms.scale(sun.radius);
    sun.MV = ms.current();
    gl.bindTexture(gl.TEXTURE_2D, sunTexture);
    sun.render();
    gl.bindTexture(gl.TEXTURE_2D, null);
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
    gl.bindTexture(gl.TEXTURE_2D, moonTexture);
    moon.render();
    gl.bindTexture(gl.TEXTURE_2D, null);
    ms.pop();
    //mercury
    ms.load(view);
    ms.push();
    ms.rotate(time * 4, [0, 1, 0]);
    ms.translate(mercury.orbit, 0, 0);
    ms.scale(mercury.radius);
    mercury.MV = ms.current();
    gl.bindTexture(gl.TEXTURE_2D, mercuryTexture);
    mercury.render();
    gl.bindTexture(gl.TEXTURE_2D, null);
    ms.pop();
    //venus
    ms.load(view);
    ms.push();
    ms.rotate(time * 1.5, [0, 1, 0]);
    ms.translate(venus.orbit, 0, 0);
    ms.scale(venus.radius);
    venus.MV = ms.current();
    gl.bindTexture(gl.TEXTURE_2D, venusTexture);
    venus.render();
    gl.bindTexture(gl.TEXTURE_2D, null);
    ms.pop();
    //mars
    ms.load(view);
    ms.push();
    ms.rotate(time * 1/2, [0, 1, 0]);
    ms.translate(mars.orbit, 0, 0);
    ms.scale(mars.radius);
    mars.MV = ms.current();
    gl.bindTexture(gl.TEXTURE_2D, marsTexture);
    mars.render();
    gl.bindTexture(gl.TEXTURE_2D, null);
    ms.pop();
    //jupiter
    ms.load(view);
    ms.push();
    ms.rotate(time * 1/12, [0, 1, 0]);
    ms.translate(jupiter.orbit, 0, 0);
    ms.scale(jupiter.radius);
    jupiter.MV = ms.current();
    gl.bindTexture(gl.TEXTURE_2D, jupiterTexture);
    jupiter.render();
    gl.bindTexture(gl.TEXTURE_2D, null);
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
    gl.bindTexture(gl.TEXTURE_2D, uranusTexture);
    uranus.render();
    gl.bindTexture(gl.TEXTURE_2D, null);
    ms.pop();
    //neptune
    ms.load(view);
    ms.push();
    ms.rotate(time * 1/165, [0,1,0])
    ms.translate(neptune.orbit, 0, 0);
    ms.scale(neptune.radius);
    neptune.MV = ms.current();
    gl.bindTexture(gl.TEXTURE_2D, neptuneTexture);
    neptune.render();
    gl.bindTexture(gl.TEXTURE_2D, null);
    ms.pop();
    requestAnimationFrame(render);
}

window.onload = init;