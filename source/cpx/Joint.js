const Transform = require('../core/Transform');
const Vector = require('../core/Vector');

module.exports = class Joint {
  constructor(cpx, limb, parent) {
    this.cpx = cpx;
    this.limb = limb;
    this._parentKey = parent;
    parent = this.cpx.getJoint(parent);
    this.current = new Transform(this).setParent((parent==undefined)?
      this.cpx.trf : parent.current);
    this.target = new Transform(this);
    // this.smooth = {freq:2, damp:0.5, resp:2};
  }
  generateData() { return {
    parent: this._parentKey,
    transform: this.target.generateData(),
    // smooth: this.smooth,
  }}
  freq(x) {this.smooth.freq = x;}
  damp(x) {this.smooth.damp = x;}
  resp(x) {this.smooth.resp = x;}
  update() {
    // TEMP FOR EXPERIMENTING
    this.limb.trf.setParent(this.current);
    if (this.cpx.parent.settings.instantSnap) {
      this.current.set(...this.target.get());
      this.current.dirty = true;
      return;
    }
    for (let prop of ['_anchor', '_offset']) {
      const stepDefault = 1.5;
      for (let dim of ['x', 'y']) {
        let current = this.current[prop][dim];
        if (this.target[prop][dim] == current) continue;
        let step = Math.min(stepDefault, Math.abs(this.target[prop][dim]-current));
        if (this.target[prop][dim] < current) step *= -1;
        this.current[prop][dim] += step;
      }
    }
    for (let prop of ['_scale', '_rotation']) {
      const stepDefault = 0.033;
      let current = this.current[prop];
      if (this.target[prop] == current) continue;
      let step = Math.min(stepDefault, Math.abs(this.target[prop]-current));
      if (this.target[prop] < current) step *= -1;
      this.current[prop] += step;
    }
    this.current.dirty = true;
  }
  snap() {
    this.current.set(...this.target.get());
  }
  // target methods
  move(delta) {this.target.move(delta); return this;}
  offset(delta) {this.target.offset(delta); return this;}
  scale(delta) {this.target.scale(delta); return this;}
  scaleAdd(delta) {this.target.scaleAdd(delta); return this;}
  rotate(delta) {this.target.rotate(delta); return this;}
  setPosition(other) {this.target.setPosition(other); return this;}
  setOffset(other) {this.target.setOffset(other); return this;}
  setScale(other) {this.target.setScale(other); return this;}
  setRotation(other) {this.target.setRotation(other); return this;}
  getPosition() {return this.target.getPosition();}
  getOffset() {return this.target.getOffset();}
  getScale() {return this.target.getScale();}
  getRotation() {return this.target.getRotation();}
}
