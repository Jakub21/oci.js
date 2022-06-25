let GENERATED_ID_IDX = 0;
const Vector = require('./Vector');
const Texture = require('./Texture');
const Transform = require('./Transform');
const Box = require('./Box');

module.exports = class Element {
  constructor(parent, offset, zIndex) {
    parent.attach(this);
    this.parent = parent;
    this.attached = [];
    this.id = this.generateID();
    this.offset = offset || new Vector(0,0);
    this.zIndex = zIndex || GENERATED_ID_IDX+1;
    this.trf = new Transform(this);
    this.tex = new Texture();
  }
  draw(ctx) {
    //
  }
  attach(child) {
    this.attached.push(child);
    this.parent.attachDrawOnly(child);
  }
  attachDrawOnly(child) {
    this.parent.attachDrawOnly(child); // pass to CanvasInterface
  }
  _drawCenter(ctx) {
    ctx.fillStyle = '#FFF';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.beginPath();
    let center = this.parent.trf.toAbs(this.offset);
    ctx.arc(center.x, center.y, 5, 0, Math.PI*2);
    ctx.fill();
    ctx.stroke();
  }
  intersects(vector) {
    //
  }
  generateID() {
    const now = Date.now().toString(16).toUpperCase();
    GENERATED_ID_IDX += 1;
    return now + GENERATED_ID_IDX;
  }
  remove() {
    this.ci.elements.remove(this);
  }
}
