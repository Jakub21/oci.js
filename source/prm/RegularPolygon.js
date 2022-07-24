const Polygon = require('./Polygon');
const Vector = require('../core/Vector');

module.exports = class RegularPolygon extends Polygon {
  constructor(ci, sides, radius, zIndex) {
    let vertices = RegularPolygon.generateVertices(sides, radius);
    super(ci, vertices, zIndex);
    this.sides = sides;
  }
  static generateVertices(sides, radius) {
    let vertices = [];
    let delta = 2 * Math.PI / sides;
    let angle = (!(sides%2))? -Math.PI/sides : Math.PI/(sides*2);
    for (let vi=0; vi<sides; vi++) {
      angle += delta;
      let x = Math.cos(angle) * radius;
      let y = Math.sin(angle) * radius;
      vertices.push(new Vector(x, y));
    }
    return vertices;
  }
}
