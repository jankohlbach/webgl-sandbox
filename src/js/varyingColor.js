import { setup, prepareDimensionsAndColor } from './helper';
import { setRectangle } from './shapes';

import vShaderSource from '../shader/vertexVaryingColor.glsl';
import fShaderSource from '../shader/fragmentVaryingColor.glsl';

const { canvas, gl, program } = setup(vShaderSource, fShaderSource);

const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');

const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');

const positionBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

gl.enableVertexAttribArray(positionAttributeLocation);

const size = 2;
const type = gl.FLOAT;
const normalize = false;
const stride = 0;
const offset = 0;

gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

prepareDimensionsAndColor(canvas, gl, program);

gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

setRectangle(gl, 0, 0, gl.canvas.width, gl.canvas.height);

const primitiveType = gl.TRIANGLES;
const offsetDraw = 0;
const count = 6;

gl.drawArrays(primitiveType, offsetDraw, count);
