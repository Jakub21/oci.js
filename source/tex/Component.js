
module.exports = class Component {
  constructor(elm) {
    elm.tex.components.push(this);
    this.elm = elm;
  }
  generateData() {return {
    err: `${this.constructor.name} not implemented`,
  }}
  draw(ctx, path) {
    //
  }
}
