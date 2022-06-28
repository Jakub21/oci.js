const MakeDomMatrix = require('../core/MakeDomMatrix');
const Vector = require('../core/Vector');

// TODO: Make sure the pattern is created after image is loaded

module.exports = class Pattern {
  constructor(path, repeat='repeat', scale=1) {
    this.scale = scale;
    this.ready = false;
    this.img = $.make('img').prop({src:path});
    this.img.on('load', () => {
      let canvas = $.make('canvas');
      let ctx = canvas.elm.getContext('2d');
      this.pattern = ctx.createPattern(this.img.elm, repeat);
      this.ready = true;
    }).on('error', () => {
      console.error(`Pattern image is not available '${path}'`);
    });
  }
  apply(mode, ctx) {
    if (!this.ready) return;
    if (mode == 'Fill') ctx.fillStyle = this.pattern;
    else if (mode == 'Outline') ctx.strokeStyle = this.pattern;
  }
  align(element) {
    if (!this.ready) return;
    // NOTE: should the pattern be scaled with the element?
    let matrix = MakeDomMatrix(
      element.trf.getTranslate(),
      element.trf.getRotate(),
      1, //element.trf.getScale(),
    );
    this.pattern.setTransform(matrix);
  }
  scale(scale) {
    this.scale = scale;
  }
  getHex() {
    return this.pattern;
  }
}
