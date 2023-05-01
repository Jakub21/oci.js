// TODO: Make sure the pattern is created after image is loaded

export default class Pattern {
  constructor(path, repeat='repeat') {
    this.repeat = repeat;
    this.ready = false;
    this.img = $.make('img').prop({src:path});
    this.img.on('load', () => {
      let canvas = $.make('canvas');
      let ctx = canvas.elm.getContext('2d');
      this.pattern = ctx.createPattern(this.img.elm, this.repeat);
      this.ready = true;
    }).on('error', () => {
      console.error(`Image is not available '${path}'`);
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
    // let matrix = MakeDomMatrix(
    //   element.trf.getTranslate(),
    //   element.trf.getRotate(),
    //   1, //element.trf.getScale(),
    // );
    // this.pattern.setTransform(matrix);
  }
  getHex() {
    return this.pattern;
  }
}
