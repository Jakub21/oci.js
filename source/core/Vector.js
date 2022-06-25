
module.exports = class Vector {
  constructor(x=0, y=0) {
    this.x = x;
    this.y = y;
  }
  copy() {
    return new Vector(this.x, this.y);
  }
  get() {
    return [this.x, this.y];
  }
  add(other) {
    this.x += other.x;
    this.y += other.y;
    return this;
  }
  sub(other) {
    this.x -= other.x;
    this.y -= other.y;
    return this;
  }
  mult(factor) {
    this.x *= factor;
    this.y *= factor;
    return this;
  }
  dot(other) {
    return this.x * other.x + this.y * other.y;
  }
  mag() {
    return Math.sqrt(this.x**2 + this.y**2);
  }
  rotate(angle) {
    const x = this.x, y = this.y;
    const cos = Math.cos(angle), sin = Math.sin(angle);
    this.x = x * cos - y * sin;
    this.y = x * sin + y * cos;
    return this;
  }
  angle() {
    return -Math.atan2(this.y, this.x);
  }
  angleTo(next) {
    return new Vector(next.x-this.x, next.y-this.y).angle();
  }
  equals(other) {
    return (this.x == other.x) && (this.y == other.y);
  }

  static Array(arr) {
    return arr.map(([x,y]) => {return new oci.Vector(x,y)});
  }
}
