var program;
var slider;

function main()
{
    // Retrieve <canvas> element
    var canvas = document.getElementById('webgl');

    // Get the rendering context for WebGL
    gl = WebGLUtils.setupWebGL(canvas, undefined);
    if (!gl)
    {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    program = initShaders(gl, "vshader", "fshader");
    gl.useProgram(program);

    gl.viewport( 0, 0, canvas.width, canvas.height );

    // Set clear color
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var buffer = gl.createBuffer();

    gl.uniform1f(gl.getUniformLocation(program,"rayNum"), 5.0);
    // Create a square as a strip of two triangles.
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            -1,1,
            0,1,
            1,0,
            -1,-1,
            0,1,
            -1,0]),
        gl.STATIC_DRAW
    );

    gl.aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(gl.aPosition);
    gl.vertexAttribPointer(gl.aPosition, 3, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);







    slider = document.getElementById("myRange");
    gl.uniform1f(gl.getUniformLocation(program,"rayNum"), parseInt(slider.value));

    // Update the current slider value (each time you drag the slider handle)

    window.addEventListener("change", changeRay, false);

}




function changeRay(){
    slider = document.getElementById("myRange");
    gl.uniform1f(gl.getUniformLocation(program,"rayNum"), parseFloat(slider.value));
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            -1,1,
            0,1,
            1,0,
            -1,-1,
            0,1,
            -1,0]),
        gl.STATIC_DRAW
    );

    gl.aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(gl.aPosition);
    gl.vertexAttribPointer(gl.aPosition, 3, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);


    console.log(parseFloat(slider.value));
}