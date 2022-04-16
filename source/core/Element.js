let GENERATED_ID_IDX = 0;
const Vector = require('./Vector');
const Texture = require('./Texture');
const Transform = require('./Transform');
const Box = require('./Box');

module.exports = class Element {
  constructor(ci, pos, zIndex) {
    ci.elements.add(this);
    this.ci = ci;
    this.id = this.generateID();
    this.pos = pos || new Vector(0,0);
    this.zIndex = zIndex || GENERATED_ID_IDX+1;
    this.trf = new Transform(this.pos);
    this.tex = new Texture();
  }
  draw(ctx) {
    //
  }
  _drawCenter(ctx) {
    ctx.fillStyle = '#FFF';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, 5, 0, Math.PI*2);
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
