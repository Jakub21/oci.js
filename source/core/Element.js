let GENERATED_ID_IDX = 0;
const Vector = require('./Vector');
const Transform = require('./Transform');

module.exports = class Element {
  constructor(parent, zIndex) {
    parent.attach(this);
    this.parent = parent.self(); // NOTE
    this.id = this.generateID();
    this.zIndex = zIndex || GENERATED_ID_IDX+1;
    this.trf = new Transform(this);
    this.trf.setParent(this.parent.trf);
  }
  generateData() { return {
    Z: this.zIndex,
    TRF: this.trf.generateData(),
  }}
  self() {return this;} // NOTE
  generateID() {
    const now = Date.now().toString(16).toUpperCase();
    GENERATED_ID_IDX += 1;
    return now + GENERATED_ID_IDX;
  }
  getInterface() {
    return this.parent.getInterface();
  }
  remove() {
    this.getInterface().elements.remove(this);
  }
  // must be implemented by subclasses
  draw(ctx) {}
  intersects(vector) {}
}
