import Shape from "../Shape.js";
import Vector from "../../geometry/Vector.js";

export default class Ellipse extends Shape {
  initialize(params) {
    this.radius = params.radius || new Vector(1, 1);
    this.rotation = params.rotation || 0;
    this.startAngle = params.startAngle || 0;
    this.endAngle = params.endAngle || Math.PI * 2;
    this.ccw = params.ccw || false;
    // TODO bounding box
    super.initialize();
  }
  generatePath() {
    let path = new Path2D();
    path.ellipse(0, 0, this.radius.x, this.radius.y, this.rotation,
      this.startAngle, this.endAngle, this.ccw);
    return path;
  }
}
