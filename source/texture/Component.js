
export default class Component {
  constructor(elm) {
    elm.tex.components.push(this);
    this.elm = elm;
  }
  generateData() {return {
    type: `${this.constructor.name}`,
  }}
  draw(ctx, path) {
    //
  }
}
