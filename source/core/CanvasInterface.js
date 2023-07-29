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
  update() {
    this.view.updateSize();
    const ctx = this.canvas.getContext('2d');
    this.view.apply(ctx);
    this.elements.draw(ctx);
  }
  attach(element) {
    this.elements.attach(element);
  }
}
