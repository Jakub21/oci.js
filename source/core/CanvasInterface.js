const CanvasView = require('./CanvasView');
const ElementStore = require('./ElementStore');
const Transform = require('./Transform');

module.exports = class CanvasInterface {
  constructor(canvas) {
    this.canvas = canvas;
    this.view = new CanvasView(this);
    this.elements = new ElementStore(this);
    this.trf = Transform.None();
    this.config = {
      drawElementBoxEnable: true,
    }
  }
  update() {
    this.view.updateSize();
    this.elements.drawAll();
  }
  attach(element) {
    this.elements.add(element);
  }
  attachDrawOnly(element) {
    this.elements.addDrawOnly(element);
  }
}
