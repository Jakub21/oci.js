const Vector = require('../core/Vector');
const EllipseSlice = require('./EllipseSlice');

module.exports = class Ellipse extends EllipseSlice {
  constructor(ci, pos, radii, span, baseAngle, ccw, zIndex) {
    super(ci, pos, radii, 2*Math.PI, 0, false, zIndex);
  }
}
