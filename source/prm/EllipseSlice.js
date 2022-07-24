const Vector = require('../core/Vector');
const Primitive = require('./Primitive');
const Box = require('../core/Box');

module.exports = class EllipseSlice extends Primitive {
  constructor(ci, radii, span, baseAngle=0, ccw=false, connectOrigin=true, zIndex) {
    super(ci, zIndex);
    this.radii = radii;
    this.span = span;
    this.baseAngle = baseAngle;
    this.ccw = ccw;
    this.connectOrigin = connectOrigin;
  }
  draw(ctx) {
    let path = new Path2D();
    let origin = this.parent.trf.toAbs(this.parent.trf.transform(this.offset)).add(this.trf.translate);
    let startAngle = this.baseAngle;
    let endAngle = (this.ccw)? startAngle-this.span : startAngle+this.span;
    let unit = this.trf.transform(Vector.UnitX()).sub(this.trf.transform(new Vector()));
    let radii = this.radii.copy().mult(unit.mag());
    path.ellipse(origin.x, origin.y, radii.x, radii.y, this.trf.rotate,
      startAngle, endAngle, this.ccw);
    if (this.connectOrigin) {
      path.lineTo(...origin.get());
      path.closePath();
    }
    this.tex.draw(ctx, path);
  }
  intersects(vector) {
    // TODO
  }
  getBoxAbs() {
    // TODO
    // return new Box(min.x, min.y, max.x, max.y);
  }
}
