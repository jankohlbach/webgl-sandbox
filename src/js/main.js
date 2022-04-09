import { setup, prepareDimensionsAndColor, randomInRange } from './helper';
import { setRectangle } from './shapes';

import vShaderSource from '../shader/vertex.glsl';
import fShaderSource from '../shader/fragment.glsl';

const { canvas, gl, program } = setup(vShaderSource, fShaderSource);

const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
const colorUniformLocation = gl.getUniformLocation(program, 'u_color');

const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');

const positionBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

const vertexArrayObject = gl.createVertexArray();

gl.bindVertexArray(vertexArrayObject);

gl.enableVertexAttribArray(positionAttributeLocation);

const size = 2;
const type = gl.FLOAT;
const normalize = false;
const stride = 0;
const offset = 0;

gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

prepareDimensionsAndColor(canvas, gl, program);

gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

for (let i = 0; i < 50; i += 1) {
  setRectangle(
    gl, randomInRange(0, 400), randomInRange(0, 300), randomInRange(0, 400), randomInRange(0, 300),
  );

  gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);

  const primitiveType = gl.TRIANGLES;
  const offsetDraw = 0;
  const count = 6;

  gl.drawArrays(primitiveType, offsetDraw, count);
}
