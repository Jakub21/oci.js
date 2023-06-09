import Shape from '../Shape.js';
import Vector from "../../geometry/Vector.js";

export default class Polygon extends Shape {
  validatePolygon(params) {
    if (params.vertices == undefined) {
      throw "Cannot create a polygon with out defining the vertices";
    }
    if (params.vertices.length < 3) {
      throw "Cannot create a polygon with less than 3 vertices";
    }
    if (params.vertices.map(v => {return v instanceof Vector}).includes(false)) {
      throw "Cannot create a polygon if at least one vertex is not instance of oci Vector";
    }
    // TODO check if the edges intersect each other
  }
  initialize(params) {
    this.validatePolygon(params);
    this.vertices = params.vertices;
    // TODO bounding box
    // TODO triangulate
    super.initialize();
  }
  generatePath() {
    let path = new Path2D();
    path.moveTo(...this.vertices[0].get());
    for (let vertex of this.vertices.slice(1)) {
      path.lineTo(...vertex.get());
    }
    path.lineTo(...this.vertices[0].get());
    return path;
  }
}
