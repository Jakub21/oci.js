const Vector = require('../core/Vector');
const Element = require('../core/Element');
const Box = require('../core/Box');
const Color = require('../core/Color');

module.exports = class EllipseSlice extends Element {
  constructor(ci, pos, radii, span, baseAngle, ccw, zIndex) {
    super(ci, pos, zIndex);
    this.radii = radii;
    this.span = span;
    this.baseAngle = baseAngle || 0;
    this.ccw = ccw || false;
  }
  draw(ctx) {
    // NOTE: Refactor this so that full transformation works, now scale is ommited
    ctx.lineWidth = this.tex.lineWidth;
    ctx.strokeStyle = this.tex.outline.getHex();
    ctx.fillStyle = this.tex.fill.getHex();
    ctx.beginPath();
    let origin = this.pos.copy().add(this.trf.translate);
    let startAngle = this.baseAngle;
    let endAngle = (this.ccw)? startAngle-this.span : startAngle+this.span;
    ctx.ellipse(origin.x, origin.y, this.radii.x, this.radii.y, this.trf.rotate,
      startAngle, endAngle, this.ccw);
    ctx.stroke();
    ctx.lineTo(...origin.get());
    ctx.fill();
    // if (this.tex.image != undefined) {
    //   ctx.drawImage(this.tex.image, this.pos.x, this.pos.y); // TODO
    // }
    // this._drawCenter(ctx);
    //this.getBoxAbs().draw(ctx);
  }
  intersects(vector) {
    // TODO
  }
  getBoxAbs() {
    // TODO
    // return new Box(min.x, min.y, max.x, max.y);
  }
}
