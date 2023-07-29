
export default class ElementStore {
  constructor() {
    this.elements = [];
  }
  draw(ctx) {
    const sorted = this.elements.sort((a,b) => {return a.zIndex - b.zIndex});
    for (const elm of sorted) {
      elm.draw(ctx);
    }
  }
  attach(elm) {
    this.elements.push(elm);
  }
  remove(elm) {
    this.elements = this.elements.filter(e=>{return e != elm});
  }
  getID(id) {
    return this.elements.filter(e=>{return e.id = id})[0];
  }
  intersectsAny(vector) {
    return this.elements.map(elm => {return elm.intersects(vector)}).includes(true);
  }
  // getIntersecting(vector) { }
  // getIntersectingAll(vector) { }
}
