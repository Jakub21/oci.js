import Polygon from "./Polygon.js";
import Vector from "../../geometry/Vector.js";

export default class Rectangle extends Polygon {
  validateRectangle(params) {
    if (params.x == undefined || params.y == undefined) {
      throw "Cannot create a rectangle with either x or y dimension missing";
    }
    if ((typeof params.x != 'number') || (typeof params.y != 'number')) {
      throw "Cannot create a rectangle if either x or y is not a number";
    }
    if (params.x <= 0 || params.y <= 0) {
      throw "Cannot create a rectangle with either dimension non-positive";
    }
  }
  initialize(params) {
    this.validateRectangle(params);
    super.initialize({vertices: [
      new Vector(-params.x / 2, -params.y / 2),
      new Vector(-params.x / 2, params.y / 2),
      new Vector(params.x / 2, params.y / 2),
      new Vector(params.x / 2, -params.y / 2),
    ]});
  }
}
