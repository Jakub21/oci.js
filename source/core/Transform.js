const Vector = require('./Vector');

module.exports = class Transform {
  // constructor(elm, translate, rotate=0, scale=1) {
  constructor(elm, translate, scale=1, rotate=0) {
    this.elm = elm;
    this.translate = translate || new Vector(0,0);
    this.scale = scale;
    this.rotate = rotate
    this.none = false;
  }
  toRel(vector) {
    if (this.none) return vector;
    vector = this.elm.parent.trf.toRel(vector);
    return vector.copy().sub(this.elm.offset); // TODO
  }
  toAbs(vector) {
    if (this.none) return vector;
    vector = this.elm.parent.trf.toAbs(vector);
    return vector.copy().add(this.elm.offset); // TODO
  }
  transform(vector, r=0) {
    vector = vector.copy();
    if (this.none) return vector;
    vector.mult(this.scale);
    vector.add(this.translate);
    vector.rotate(this.rotate);
    vector.add(this.elm.offset);
    vector = this.elm.parent.trf.transform(vector, r+1);
    vector.sub(this.elm.offset);
    return vector;
  }
  reverse(vector) {
    if (this.none) return vector;
    vector = this.elm.parent.trf.reverse(vector);
    let rel = vector.copy();
    rel.rotate(-this.rotate).sub(this.translate).mult(1/this.scale);
    return rel;
  }
  static None() {
    const trf = new Transform();
    trf.none = true;
    return trf;
  }
  get0x() {
    let or = this.toAbs(this.transform(new Vector(0,0)));
    let ux = this.toAbs(this.transform(new Vector(0,1)));
    return ux.copy().sub(or);
  }
  getTranslate() {
    let d0x = this.get0x();
    return d0x.add(this.elm.offset);
  }
  getRotate() {
    let d0x = this.get0x();
    return d0x.angle();
  }
  getScale() {
    let d0x = this.get0x();
    return d0x.mag();
  }
}
