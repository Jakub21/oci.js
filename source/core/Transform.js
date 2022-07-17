const Vector = require('./Vector');
const Matrix = require('./Matrix');

/*
Transformation order (left to right)
- anchor offset (position vector relative to the parent)
- anchor rotation (rotates both element and anchor vector around the parent)
- element offset (moves element away from the anchor)
- element scale (scales the element (and element offset))
- element rotation (rotates element around the anchor point)
*/

module.exports = class Transform {
  constructor(elm) {
    this.elm = elm;
    this._anchor = new Vector(0,0);
    this._offset = new Vector(0,0);
    this._scale = 1;
    this._rotation = 0;
    this.matrix = new Matrix();
    this.dirty = false;
    this.isNone = false;
  }
  static None() {
    let trf = new Transform('<None>');
    trf.isNone = true;
    return trf;
  }
  // modifiers
  move(delta) {this._anchor.add(delta); this.dirty = true;}
  offset(delta) {this._offset.add(delta); this.dirty = true;}
  scale(delta) {this._scale *= delta; this.dirty = true;}
  rotate(delta) {this._rotation += delta; this.dirty = true;}
  // setters
  setPosition(other) {this._anchor = delta.copy(); this.dirty = true;}
  setOffset(other) {this._offset = delta.copy(); this.dirty = true;}
  setScale(other) {this._scale = other; this.dirty = true;}
  setRotation(other) {this._rotation = other; this.dirty = true;}
  // getters
  getPosition() {return this.offset.copy();}
  getOffset() {return this._offset.copy();}
  getScale() {return this._scale;}
  getRotation() {return this._rotation;}
  // api
  apply(ctx) {
    let matrix = this.getAbsolute();
    ctx.setTransform(...matrix.getDOMValues());
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
  getAbsolute(matrix=undefined) {
    if (matrix == undefined) matrix = this.getMatrix().copy();
    else matrix.mult(this.getMatrix());
    if (this.isNone) return matrix;
    let parent = this.elm.parent.trf;
    return parent.getAbsolute(matrix);
  }
}
