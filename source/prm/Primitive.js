import Element from '../core/Element.js';
import Texture from '../tex/Texture.js';

export default class Primitive extends Element {
  constructor(parent, zIndex) {
    super(parent, zIndex);
    this.tex = new Texture(this);
    // this.box = ...
  }
  generateData() {
    let data = super.generateData();
    data.tex = this.tex.generateData();
    return data;
  }
  draw(ctx, path) {
    // create a path in a subclass.draw and then call this method
    this.trf.apply(ctx);
    this.tex.draw(ctx, path);
  }
  intersects(vector) {}
}
