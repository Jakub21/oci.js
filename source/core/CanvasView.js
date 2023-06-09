import Vector from '../geometry/Vector.js';
import Matrix from '../geometry/Matrix.js';

export default class CanvasView {
  constructor(ci) {
    this.ci = ci;
    this.offset = new Vector();
    this.scale = 1;
    this.rotation = 0;
    this.matrix = new Matrix();
  }
  updateSize() {
    const canvas = this.ci.canvas;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    this.matrix.reset();
    this.matrix.mult(Matrix.Translation(this.offset));
    this.matrix.mult(Matrix.Scaling(this.scale));
    this.matrix.mult(Matrix.Rotation(this.rotation));
  }
  apply(ctx) {
    ctx.transform()
  }
}
