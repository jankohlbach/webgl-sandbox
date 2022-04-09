export const randomInRange = (min, max) => min + Math.random() * (max - min);

export const createCanvasContext = () => {
  const canvas = document.querySelector('canvas');
  const gl = canvas.getContext('webgl2');

  if (!gl) {
    console.error('no webgl2 for you :(');
  }

  return { canvas, gl };
};

export const createShader = (gl, type, source) => {
  const shader = gl.createShader(type);

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

  if (success) {
    return shader;
  }

  console.error(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);

  return null;
};

export const createProgram = (gl, vertexShader, fragmentShader) => {
  const program = gl.createProgram();

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  const success = gl.getProgramParameter(program, gl.LINK_STATUS);

  if (success) {
    return program;
  }

  console.error(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);

  return null;
};

export const setup = (vShaderSource, fShaderSource) => {
  const { canvas, gl } = createCanvasContext();

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vShaderSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fShaderSource);

  const program = createProgram(gl, vertexShader, fragmentShader);

  return { canvas, gl, program };
};

export const prepareDimensionsAndColor = (canvas, gl, program) => {
  const { width, height } = canvas.getBoundingClientRect();

  canvas.width = width;
  canvas.height = height;

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.useProgram(program);
};
