const Polygon = require('./Polygon');

module.exports = class MirroredPolygon extends Polygon {
  constructor(ci, pos, axis='y', sverts, zIndex) {
    let vertices = MirroredPolygon.generateVertices(axis, sverts);
    super(ci, pos, vertices, zIndex);
    this.axis = axis;
    this.sectionVertices = sverts;
  }
  static generateVertices(axis, sverts) {
    const VERT = axis.toLowerCase() == 'y';
    let mod = VERT?
      (v) => {v=v.copy(); v.y = -v.y; return v;} :
      (v) => {v=v.copy(); v.x = -v.x; return v;};
    return [...sverts, ...sverts.map(mod).reverse()];
  }
}
