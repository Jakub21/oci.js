
export default class Vector {
  constructor(x=0, y=0, z=0) {
    this.x = x;
    this.y = y;
    this.z = z; // required by matrix transformations
  }
  copy() {
    return new Vector(this.x, this.y, this.z);
  }
  get() { // 2D
    return [this.x, this.y];
  }
  add(other) {
    this.x += other.x;
    this.y += other.y;
    this.z += other.z;
    return this;
  }
  sub(other) {
    this.x -= other.x;
    this.y -= other.y;
    this.z -= other.z;
    return this;
  }
  mult(factor) {
    if (factor == undefined) return;
    this.x *= factor;
    this.y *= factor;
    this.z *= factor;
    return this;
  }
  dot(other) {
    return this.x * other.x + this.y * other.y + this.z * other.z;
  }
  mag() { // 2D
    return Math.sqrt(this.x**2 + this.y**2);
  }
  rotate(angle) { // 2D
    const x = this.x, y = this.y;
    const cos = Math.cos(angle), sin = Math.sin(angle);
    this.x = x * cos - y * sin;
    this.y = x * sin + y * cos;
    return this;
  }
  angle() { // 2D
    return -Math.atan2(this.y, this.x);
  }
  angleTo(next) { // 2D
    return new Vector(next.x-this.x, next.y-this.y).angle();
  }
  equals(other) { // 2D
    return (this.x == other.x) && (this.y == other.y);
  }
  static UnitX() { return new Vector(1,0); }
  static UnitY() { return new Vector(0,1); }
  static UnitXY() { return new Vector(1,1); }
  static Array(arr) {
    return arr.map(([x,y]) => {return new oci.Vector(x,y)});
  }
}
