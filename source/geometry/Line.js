
export default class Line {
  constructor(va, vb) {
    this.va = va;
    this.vb = vb;
  }
  angleSignTo(vector) {
    // https://stackoverflow.com/a/9997374
    let a = this.va, b = this.vb;
    let q = ((vector.y-a.y) * (b.x-a.x));
    let w = ((b.y-a.y) * (vector.x-a.x));
    if (q==w) return 0;
    return (q>w)? 1 : -1;
  }
  // intersects(other) {
  //   // https://stackoverflow.com/a/9997374
  //   let ccw = (a, b, c) => {
  //     return ((c.y-a.y) * (b.x-a.x)) > ((b.y-a.y) * (c.x-a.x));
  //   }
  //   // if (this.equals(other)) return false;
  //   let a = this.va, b = this.vb, c = other.va, d = other.vb;
  //   return (ccw(a,c,d) != ccw(b,c,d)) && (ccw(a,b,c) != ccw(a,b,d));
  // }
  angleTo(other) {
    let a = this.va.angleTo(this.vb);
    let b = other.va.angleTo(other.vb);
    return this.normalize((b - a) % Math.PI);
  }
  normalize(angle) {
    const halfPI = Math.PI/2;
    if (angle > halfPI || angle < -halfPI) return -(angle%halfPI);
    return angle;
  }
  equals(other) {
    return ((this.va.equals(other.va) && this.vb.equals(other.vb)) ||
      (this.vb.equals(other.va) && this.va.equals(other.vb)));
  }
}
