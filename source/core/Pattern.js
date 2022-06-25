const MakeDomMatrix = require('./MakeDomMatrix');
const Vector = require('./Vector');

module.exports = class Pattern {
  constructor(path, repeat='repeat', scale=1) {
    this.scale = scale;
    this.img = $.make('img').prop({src:path});
    let canvas = $.make('canvas');
    let ctx = canvas.elm.getContext('2d');
    this.pattern = ctx.createPattern(this.img.elm, repeat);
  }
  align(element) {
    let matrix = MakeDomMatrix(
      element.trf.getTranslate(),
      element.trf.getRotate(),
      1, //element.trf.getScale(),
    );
    // NOTE: should the pattern be scaled with the element?
    this.pattern.setTransform(matrix);
  }
  scale(scale) {
    this.scale = scale;
  }
  getHex() {
    return this.pattern;
  }
}
