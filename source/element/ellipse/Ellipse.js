import EllipseSlice from './EllipseSlice.js';

export default class Ellipse extends EllipseSlice {
  constructor(ci, radii, span, baseAngle, ccw, zIndex) {
    super(ci, radii, 2*Math.PI, 0, false, false, zIndex);
  }
}
