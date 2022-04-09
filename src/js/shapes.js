export const setRectangle = (gl, x, y, width, height) => {
  const x1 = x;
  const x2 = x1 + width;
  const y1 = y;
  const y2 = y1 + height;

  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      x1, y1,
      x2, y1,
      x1, y2,
      x1, y2,
      x2, y1,
      x2, y2,
    ]),
    gl.STATIC_DRAW,
  );
};

export const abc = () => {

};
