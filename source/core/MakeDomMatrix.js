
module.exports = MakeDomMatrix = (transl, rotate, scale) => {
  let cos = Math.cos(rotate), sin = Math.sin(rotate);
  return new DOMMatrix([cos*scale, -sin*scale, sin*scale, cos*scale, transl.x, transl.y]);
}
