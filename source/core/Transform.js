const Vector = require('./Vector');

module.exports = class Transform {
  constructor(center, translate, rotate=0, scale=1) {
    this.center = center;
    this.translate = translate || new Vector(0,0);
    this.rotate = rotate;
    this.scale = scale;
  }
  recenter(vector) {
    this.center = vector;
  }
  toRel(vector) {
    return vector.copy().sub(this.center);
  }
  toAbs(vector) {
    return vector.copy().add(this.center);
  }
  transform(vector) {
    let rel = vector.copy().mult(this.scale);
    rel.rotate(this.rotate).add(this.translate);
    return rel;
  }
  reverse(vector) {
    let rel = vector.copy().sub(this.translate);
    rel.rotate(-this.rotate).mult(1/this.scale);
    return rel;
  }
}
