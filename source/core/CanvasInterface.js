import CanvasView from './CanvasView.js';
import ElementStore from './ElementStore.js';
import Transform from '../geometry/Transform.js';

export default class CanvasInterface {
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
