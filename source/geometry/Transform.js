import Vector from './Vector.js';
import Matrix from './Matrix.js';

/*
Transform parameters
  ax, ay = anchor (x, y)
  ox, oy = offset (x, y)
  s = scale
  r = rotation
*/

export default class Transform {
  constructor(params={}) {
    this._anchor = new Vector(params.ax || 0, params.ay || 0);
    this._offset = new Vector(params.ox || 0, params.oy || 0);
    this._scale = params.s || 1;
    this._rotation = params.r || 0;
    this.matrix = new Matrix();
    this.dirty = true;
  }
  set(anchor, offset, scale, rotation) {
    this._anchor = anchor;
    this._offset = offset;
    this._scale = scale;
    this._rotation = rotation;
    this.dirty = true;
  }
  get() {
    return [this._anchor.copy(), this._offset.copy(), this._scale, this._rotation];
  }

  // modifiers
  move(delta) {
    this._anchor.add(delta);
    this.dirty = true;
    return this;
  }
  offset(delta) {
    this._offset.add(delta);
    this.dirty = true;
    return this;
  }
  scale(delta) {
    this._scale *= delta;
    this.dirty = true;
    return this;
  }
  scaleAdd(delta) {
    this._scale += delta;
    this.dirty = true;
    return this;
  }
  rotate(delta) {
    this._rotation += delta;
    this.dirty = true;
    return this;
  }

  // setters
  setPosition(vector) {
    this._anchor = vector.copy();
    this.dirty = true;
    return this;
  }
  setOffset(vector) {
    this._offset = vector.copy();
    this.dirty = true;
    return this;
  }
  setScale(value) {
    this._scale = value;
    this.dirty = true;
    return this;
  }
  setRotation(value) {
    this._rotation = value;
    this.dirty = true;
    return this;
  }

  // getters
  getPosition() {
    return this.offset.copy();
  }
  getOffset() {
    return this._offset.copy();
  }
  getScale() {
    return this._scale;
  }
  getRotation() {
    return this._rotation;
  }

  // api
  apply(ctx) {
    ctx.transform(...this.getMatrix().getDOMValues());
  }
  transform(vector) {
    let matrix = this.getMatrix();
    return matrix.apply(vector);
  }
  getMatrix() {
    if (!this.dirty) {
      return this.matrix;
    }
    let matrix = new Matrix();
    matrix.mult(Matrix.Translation(this._offset));
    matrix.mult(Matrix.Rotation(this._rotation));
    matrix.mult(Matrix.Scaling(this._scale));
    matrix.mult(Matrix.Translation(this._anchor));
    this.matrix = matrix;
    this.dirty = false;
    return this.matrix;
  }
}
