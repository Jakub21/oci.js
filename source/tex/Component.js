
module.exports = class Component {
  constructor(elm) {
    elm.tex.components.push(this);
    this.elm = elm;
  }
  draw(ctx, path) {
    //
  }
}
