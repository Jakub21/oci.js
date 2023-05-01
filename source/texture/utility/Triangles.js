import Component from '../Component.js';

export default class Triangles extends Component {
  constructor(elm, style, radius=5) {
    super(elm);
    this.elm = elm;
    this.style = style;
    this.radius = radius;
  }
  draw(ctx) {
    if (this.elm.triangles == undefined) return;
    let path = new Path2D();
    for (let tr of this.elm.triangles) {
      path.moveTo(...tr.va.get());
      path.lineTo(...tr.vb.get());
      path.lineTo(...tr.vc.get());
      path.lineTo(...tr.va.get());
    }
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#0F0';
    ctx.fillStyle = '#0F02';
    ctx.fill(path); // NOTE: Styles are ignored
    ctx.stroke(path);
  }
}
