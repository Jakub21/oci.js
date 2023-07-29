
export default class BoundingBox {
  constructor(elm, style, radius=5) {
    this.elm = elm;
    this.style = style;
    this.radius = radius;
  }
  draw(ctx) { // TODO
    let box = this.elm.box;
    let path = new Path2D();
    path.moveTo(box.xmin, box.ymin);
    path.lineTo(box.xmin, box.ymax);
    path.lineTo(box.xmax, box.ymax);
    path.lineTo(box.xmax, box.ymin);
    path.lineTo(box.xmin, box.ymin);
    ctx.strokeStyle = '#FFF';
    ctx.lineWidth = 2;
    ctx.save();
    let undo = this.getUndoMatrix();
    ctx.transform(...undo.getDOMValues());
    ctx.stroke(path); // NOTE: Styles are ignored
    ctx.restore();
  }
  getUndoMatrix() {
    // ?
  }
}
