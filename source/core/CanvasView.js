import Vector from './Vector.js';

export default class CanvasView {
  constructor(ci) {
    this.ci = ci;
    this.translation = new Vector();
    this.zoom = 1;
    this.rotation = 0;
  }
  updateSize() {
    const canvas = this.ci.canvas;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  }
}
