const CircleSlice = require('./CircleSlice');

module.exports = class Circle extends CircleSlice {
  constructor(ci, radius, zIndex) {
    super(ci, radius, 2*Math.PI, 0, false, false, zIndex);
  }
}
