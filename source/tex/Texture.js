
module.exports = class Texture {
  constructor(elm) {
    this.elm = elm;
    this.components = [];
  }
  draw(ctx, path) {
    for (let comp of this.components) {
      comp.draw(ctx, path)
    }
  }
}
