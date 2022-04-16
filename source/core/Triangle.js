// not an element subclass; used for checking vector-face intersections
const Vector = require('./Vector');
const Line = require('./Line');

module.exports = class Triangle {
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
  // intersects(q) {
  //   return this.checkAngle(this.va, this.vb, this.vc, q) &&
  //     this.checkAngle(this.vb, this.va, this.vc, q);
  // }
  // checkAngle(root, arm1, arm2, q) {
  //   let alike = (angle, compare) => {
  //     let convert = Math.abs(angle-compare) > Math.abs((angle+2*Math.PI)-compare);
  //     if (convert) angle += 2*Math.PI;
  //     return angle;
  //   }
  //   let angle1 = root.angleTo(arm1);
  //   let angle2 = alike(root.angleTo(arm2), angle1);
  //   let angleQ = alike(root.angleTo(q), angle1);
  //   let descending = (angle1 >= angleQ) && (angleQ >= angle2);
  //   let ascending = (angle2 >= angleQ) && (angleQ >= angle1);
  //   return descending || ascending;
  // }
}
