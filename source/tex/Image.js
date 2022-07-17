const Vector = require('../core/Vector');
const Matrix = require('../core/Matrix');
const Pattern = require('./Pattern');

module.exports = class Image extends Pattern {
  constructor(path, scale) {
    super(path, 'no-repeat');
    this.scale = scale;
  }
  align(element) {
    if (!this.ready) return;
    let box = element.getBoxRel();
    let elmSize = new Vector(box.xmax-box.xmin, box.ymax-box.ymin);
    this.calcBaseScale(elmSize);
    let elmMatrix = element.trf.getMatrix().copy();
    let matrix = Matrix.Translation(elmSize.copy().mult(-1));
    matrix.mult(Matrix.Scaling(this.scale));
    this.pattern.setTransform(matrix.getDOMMatrix());
  }
  calcBaseScale(elmSize) {
    let imgSize = new Vector(this.img.elm.naturalWidth, this.img.elm.naturalHeight);
    // console.log(elmSize, imgSize);
    let scale = new Vector(elmSize.x/imgSize.x, elmSize.y/imgSize.y);
    this.scale = Math.min(scale.x, scale.y);
  }
}
