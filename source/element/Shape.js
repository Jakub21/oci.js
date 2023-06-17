
export default class Shape {
  constructor(params) {
    this.params = params;
    this.initialize(params);
  }
  initialize(params) {
    // separated from the constructor so that the shape can be edited (not sure if it's useful yet)
  }
  generatePath() {
    throw `Method "generatePath" is not implemented in ${this.constructor.name}`;
  }
  intersects(vector) {
    throw `Method "intersects" is not implemented in ${this.constructor.name}`;
  }
  intersects(vector) {
    // TODO
    return $.make('canvas').elm.getContext('2d').isPointInPath(this.generatePath(), ...vector.get());
  }
}
