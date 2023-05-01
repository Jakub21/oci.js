
export default class Texture {
  constructor(elm) {
    this.elm = elm;
    this.components = [];
    this.hidden = false;
  }
  hide(flag=true) {
    this.hidden = flag;
  }
  reset() {
    this.components = [];
  }
  generateData() {
    return this.components.map(c=>{return c.generateData()});
  }
  draw(ctx, path) {
    for (let comp of this.components) {
      comp.draw(ctx, path)
    }
  }
}
