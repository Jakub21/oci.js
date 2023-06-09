// not a shape subclass; used for checking vector-face intersections
import Line from './Line.js';

export default class Triangle {
  constructor(a, b, c) {
    this.va = a.copy();
    this.vb = b.copy();
    this.vc = c.copy();
  }
  zeroArea() {
    let aZero = this.va.angleTo(this.vb) == this.va.angleTo(this.vc);
    let bZero = this.vb.angleTo(this.vc) == this.vb.angleTo(this.va);
    let cZero = this.vc.angleTo(this.vb) == this.vc.angleTo(this.va);
    return aZero || bZero || cZero;
  }
  intersects(vector) {
    // based on http://totologic.blogspot.com/2014/01/accurate-point-in-triangle-test.html
    let a = this.va, b = this.vb, c = this.vc;
    let den = ((b.y-c.y)*(a.x-c.x) + (c.x-b.x)*(a.y-c.y));
    let fa = ((b.y-c.y)*(vector.x-c.x) + (c.x-b.x)*(vector.y-c.y)) / den;
    let fb = ((c.y-a.y)*(vector.x-c.x) + (a.x-c.x)*(vector.y-c.y)) / den;
    let fc = 1 - fa - fb;
    return 0 <= fa && fa <= 1 && 0 <= fb && fb <= 1 && 0 <= fc && fc <= 1;
  }
  intersects2(vector) {
    // intersects but not on the edge
    let edges = [new Line(this.va, this.vb), new Line(this.va, this.vc),
      new Line(this.vb, this.vc)];
    for (let edge of edges) {
      if (!edge.angleSignTo(vector)) return false;
    }
    return this.intersects(vector);
  }
}
