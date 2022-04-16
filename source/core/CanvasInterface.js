const CanvasView = require('./CanvasView');
const ElementStore = require('./ElementStore');

module.exports = class CanvasInterface {
  constructor(canvas) {
    this.canvas = canvas;
    this.view = new CanvasView(this);
    this.elements = new ElementStore(this);
    this.config = {
      drawElementBoxEnable: true,
    }
  }
  update() {
    this.view.updateSize();
    this.elements.drawAll();
  }
}
