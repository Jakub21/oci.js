import Polygon from './Polygon.js';

export default class RadialPolygon extends Polygon {
  constructor(ci, sections, sverts, zIndex) {
    let vertices = RadialPolygon.generateVertices(sections, sverts);
    super(ci, vertices, zIndex);
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
