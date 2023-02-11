import Polygon from './Polygon.js';
import Vector from '../core/Vector.js';
  
export default class StarPolygon extends Polygon {
  constructor(ci, arms, radiusInner, radiusOuter, zIndex) {
    let vertices = StarPolygon.generateVertices(arms, radiusInner, radiusOuter);
    super(ci, vertices, zIndex);
    this.arms = arms;
    this.radiusInner = radiusInner
    this.radiusOuter = radiusOuter
  }
  static generateVertices(arms, radiusInner, radiusOuter) {
    let vertices = [];
    let sides = arms * 2;
    let delta = 2 * Math.PI / sides;
    let angle = 0; //(!(sides%2))? -Math.PI/sides : Math.PI/(sides*2);
    for (let vi=0; vi<sides; vi++) {
      angle += delta;
      let radius = (vi%2)? radiusInner : radiusOuter;
      let x = Math.cos(angle) * radius;
      let y = Math.sin(angle) * radius;
      vertices.push(new Vector(x, y));
    }
    return vertices;
  }
}
