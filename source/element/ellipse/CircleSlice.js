import EllipseSlice from './EllipseSlice.js';
import Vector from '../../geometry/Vector.js';

export default class CircleSlice extends EllipseSlice {
  constructor(ci, radius, span, baseAngle, ccw, connectOrigin, zIndex) {
    let radii = new Vector(radius, radius);
    super(ci, radii, span, baseAngle, ccw, connectOrigin, zIndex);
  }
}
