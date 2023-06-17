import Vector from './Vector.js';

const NO_TRANSFORM_VALUES = [1,0,0, 0,1,0, 0,0,1];


export default class Matrix {
  constructor(values) {
    if (values == undefined) {
      this.values = NO_TRANSFORM_VALUES;
      return;
    }
    if (values.length != 9 || values.constructor != Array) {
      throw 'Matrix error: Only arrays of length 9 are accepted';
    }
    this.values = values;
    // 0 3 6
    // 1 4 7
    // 2 5 8
  }
  str() {
    return `<Matrix ${this.values.map(v=>{return Math.round(v*1e3)/1e3})}>`
    .replaceAll(',', ', ');
  }
  copy() {
    return new Matrix([...this.values]);
  }
  getDOMValues() {
    let q = this.values;
    return [q[0], q[1], q[3], q[4], q[6], q[7]];
  }
  getDOMMatrix() {
    return new DOMMatrix(this.getDOMValues());
  }
  getUnits() {
    let ih = new Vector(this.values[0], this.values[1], this.values[2]);
    let jh = new Vector(this.values[3], this.values[4], this.values[5]);
    let kh = new Vector(this.values[6], this.values[7], this.values[8]);
    return [ih, jh, kh];
  }
  mult(other) {
    // [other][old this] = [new this]
    let [ih, jh, kh] = this.getUnits();
    ih = other.apply(ih); jh = other.apply(jh); kh = other.apply(kh);
    this.values = [ih.x, ih.y, ih.z, jh.x, jh.y, jh.z, kh.x, kh.y, kh.z];
    return this;
  }
  addScalar(scalar) {
    this.values.map((value, i) => {this.values[i] = value + scalar})
  }
  multScalar(scalar) {
    this.values.map((value, i) => {this.values[i] = value * scalar})
  }
  apply(vector) {
    let [ih, jh, kh] = this.getUnits();
    let xx = ih.mult(vector.x);
    let yy = jh.mult(vector.y);
    let zz = kh.mult(vector.z);
    return xx.add(yy).add(zz);
  }
  noAction() {
    return this.values == NO_TRANSFORM_VALUES;
  }
  reset() {
    this.values = NO_TRANSFORM_VALUES;
  }
  inverse() {
    // https://stackoverflow.com/a/72596891 Do not touch, it just works
    let [
      a, b, c,
      d, e, f,
      g, h, i,
    ] = this.values;
    let x = e * i - h * f,
      y = f * g - d * i,
      z = d * h - g * e,
      det = a * x + b * y + c * z;
    let result = det != 0 ? [
      [x, c * h - b * i, b * f - c * e],
      [y, a * i - c * g, d * c - a * f],
      [z, g * b - a * h, a * e - d * b]
    ].map(r => r.map(v => v /= det)) : null;
    return new Matrix(result.flat());
  }
  static Translation(vector) {
    return new Matrix([1,0,0, 0,1,0, vector.x, vector.y, 1]);
  }
  static Rotation(angle) {
    let cos = Math.cos(angle), sin = Math.sin(angle);
    return new Matrix([cos, -sin, 0, sin, cos, 0, 0,0,1]);
  }
  static Scaling(factor) {
    return new Matrix([factor,0,0, 0,factor,0, 0,0,1]);
  }
  static FromDOM(domMatrix) {
    return new Matrix([
      domMatrix.a, domMatrix.b, 0,
      domMatrix.c, domMatrix.d, 0,
      domMatrix.e, domMatrix.f, 1,
    ]);
  }
}
