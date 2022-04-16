const Polygon = require('./Polygon');

module.exports = class RadialPolygon extends Polygon {
  constructor(ci, pos, sections, sverts, zIndex) {
    let vertices = RadialPolygon.generateVertices(sections, sverts);
    super(ci, pos, vertices, zIndex);
    this.sections = sections;
    this.sectionVertices = sverts;
  }
  static generateVertices(sections, sverts) {
    let vertices = [...sverts];
    let delta = 2 * Math.PI / sections;
    for (let section=1; section < sections; section++) {
      let offset = delta * section;
      for (let original of sverts) {
        let v = original.copy().rotate(offset);
        vertices.push(v);
      }
    }
    return vertices;
  }
}
