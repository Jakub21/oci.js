
module.exports = class ElementStore {
  constructor(ci) {
    this.ci = ci;
    this.elements = [];
  }
  drawAll() {
    const sorted = this.elements.sort((a,b) => {return a.zIndex - b.zIndex});
    const ctx = this.ci.canvas.getContext('2d'); // TODO
    let v = this.ci.view;
    ctx.transform(v.zoom, 0, 0, v.zoom, v.translation.x, v.translation.y);
    ctx.rotate(v.rotation);
    for (const elm of sorted) {
      elm.draw(ctx);
    }
  }
  add(elm) {
    elm.store = this;
    this.elements.push(elm);
    // this.sortByZ();
  }
  remove(elm) {
    this.elements = this.elements.filter(e=>{return e != elm});
  }
  getID(id) { }
  getIntersecting(vector) { }
  getIntersectingAll(vector) { }
}
