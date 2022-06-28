const EllipseSlice = require('./EllipseSlice');
const Vector = require('../core/Vector');

module.exports = class CircleSlice extends EllipseSlice {
  constructor(ci, pos, radius, span, baseAngle, ccw, connectOrigin, zIndex) {
    let radii = new Vector(radius, radius);
    super(ci, pos, radii, span, baseAngle, ccw, connectOrigin, zIndex);
  }
}
