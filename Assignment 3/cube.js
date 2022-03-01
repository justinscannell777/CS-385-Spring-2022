function Cube(gl) {

    var program = initShaders(gl, "Cube-vertex-shader", "Cube-fragment-shader");
    // const posZero = [-1, -1, -1]
    // const posOne = [-1, -1, 1]
    // const posTwo = [1, -1, -1]
    // const posThree = [1, 1, -1]
    // const posFour = [-1, 1, -1]
    // const posFive = [-1, 1, 1]
    // const posSix = [1, -1, 1]
    // const posSeven = [1, 1, 1]
    const posZero = [-1, -1, -1]
    const posOne = [1, -1, -1]
    const posTwo = [1, 1, -1]
    const posThree = [-1, 1, -1]
    const posFour = [-1, -1, 1]
    const posFive = [1, -1, 1]
    const posSix = [1, 1, 1]
    const posSeven = [-1, 1, 1]
    var positions = [
        //front (positions 1, 2, 3, and 4)
        // ...posZero,
        // ...posTwo,
        // ...posFour,
        // ...posSix,
        ...posZero,
        ...posOne,
        ...posTwo,
        ...posThree,
        //back (positions 5, 6, 7, 8)
        // ...posOne,
        // ...posThree,
        // ...posFive,
        // ...posSeven,
        ...posFour,
        ...posFive,
        ...posSix,
        ...posSeven,
        //left (positions 9, 10, 11, 12)
        // ...posZero,
        // ...posFour,
        // ...posFive,
        // ...posOne,
        ...posSeven,
        ...posThree,
        ...posZero,
        ...posFour,
        //right (positions 13, 14, 15, 16)
        // ...posTwo,
        // ...posSix,
        // ...posSeven,
        // ...posThree,
        ...posTwo,
        ...posSix,
        ...posOne,
        ...posFive,
        //top (positions 17, 18, 19, 20)
        // ...posFour,
        // ...posFive,
        // ...posSix,
        // ...posSeven,
        ...posThree,
        ...posSeven,
        ...posTwo,
        ...posSix,
        //bottom (position 21, 22, 23, 24)
        // ...posZero,
        // ...posOne,
        // ...posThree,
        // ...posTwo
        ...posZero,
        ...posOne,
        ...posFive,
        ...posFour
    ];
    
    var indices = [
        //front indices
        0, 2, 1,    0, 3, 2,
        //back indices
        4, 6, 7,    4, 5, 6,
        //bottom indices
        12, 15, 14, 12, 13, 15,
        //right indices
        16, 19, 18, 16, 17, 19,
        //top indices
        8, 10, 11,  8, 9, 10,
        // //left indices
        20, 22, 23, 20, 21, 22
    ];

    var edges = [
        0, 1,  // "Front" face edges
        1, 2,
        2, 3,
        3, 0,
        4, 5,  // "Back" face edges
        5, 6,
        6, 7,
        7, 4,
        0, 4,  // "Side" edges
        1, 5,
        2, 6,
        3, 7
    ];


    positions.numComponents = 3;

    positions.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW );

    indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW );

    edges.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, edges.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(edges), gl.STATIC_DRAW );
    
    positions.aPosition = gl.getAttribLocation( program, "aPosition" );
    gl.enableVertexAttribArray( positions.aPosition );

    MV = gl.getUniformLocation(program, "MV");
    this.MV = mat4();
    P = gl.getUniformLocation(program, "P");
    this.P = mat4();

    this.render = function () {
        gl.useProgram( program );

        gl.bindBuffer( gl.ARRAY_BUFFER, positions.buffer );
        gl.vertexAttribPointer( positions.aPosition, positions.numComponents,
            gl.FLOAT, false, 0, 0 );
        gl.uniformMatrix4fv(MV, false, flatten(this.MV));
        gl.uniformMatrix4fv(P, false, flatten(this.P));

        // Render the wireframe version of the cube
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, edges.buffer );
        gl.drawElements( gl.LINES, edges.length, gl.UNSIGNED_SHORT, 0 );

        // Render the solid version of the cube
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, indices.buffer );
        gl.drawElements( gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0 );
    }
};