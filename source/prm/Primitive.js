const Element = require('../core/Element');
const Texture = require('../tex/Texture');

module.exports = class Primitive extends Element {
  constructor(parent, zIndex) {
    super(parent, zIndex);
    this.tex = new Texture(this);
    // this.box = ...
  }
  draw(ctx, path) {
    // create a path in a subclass.draw and then call this method
    this.trf.apply(ctx);
    this.tex.draw(ctx, path);
  }
  intersects(vector) {}
}
