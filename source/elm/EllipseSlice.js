const Vector = require('../core/Vector');
const Element = require('../core/Element');
const Box = require('../core/Box');
const Color = require('../core/Color');

module.exports = class EllipseSlice extends Element {
  constructor(ci, offset, radii, span, baseAngle, ccw, zIndex) {
    super(ci, offset, zIndex);
    this.radii = radii;
    this.span = span;
    this.baseAngle = baseAngle || 0;
    this.ccw = ccw || false;
  }
  draw(ctx) {
    // NOTE: Refactor this so that full transformation works, now scale is ommited
    this.tex.apply(ctx);
    ctx.beginPath();
    let origin = this.parent.trf.toAbs(this.parent.trf.transform(this.offset)).add(this.trf.translate);
    // let origin = this.offset.copy().add(this.trf.translate);
    let startAngle = this.baseAngle;
    let endAngle = (this.ccw)? startAngle-this.span : startAngle+this.span;
    let unit = this.trf.transform(new Vector(1, 0)).sub(this.trf.transform(new Vector(0,0)));
    let radii = this.radii.copy().mult(unit.mag());
    ctx.ellipse(origin.x, origin.y, radii.x, radii.y, this.trf.rotate,
      startAngle, endAngle, this.ccw);
    ctx.stroke();
    ctx.lineTo(...origin.get());
    ctx.fill();
    // if (this.tex.image != undefined) {
    //   ctx.drawImage(this.tex.image, this.offset.x, this.offset.y); // TODO
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
