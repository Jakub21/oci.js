const CanvasView = require('./CanvasView');
const ElementStore = require('./ElementStore');
const Transform = require('./Transform');

module.exports = class CanvasInterface {
  constructor(canvas) {
    this.canvas = canvas;
    this.view = new CanvasView(this);
    this.elements = new ElementStore(this);
    this.trf = new Transform();
    this.config = {
      drawElementBoxEnable: true,
    }
  }
  self() {return this;} // NOTE
  update() {
    this.view.updateSize();
    this.elements.drawAll();
  }
  attach(element) {
    this.elements.add(element);
  }
  getInterface() {
    return this;
  }
}
