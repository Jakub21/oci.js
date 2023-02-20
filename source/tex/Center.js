import Component from './Component.js';
import Vector from '../core/Vector.js';

export default class Center extends Component {
  constructor(elm, radius=10) {
    super(elm);
    this.elm = elm;
    this.radius = radius;
  }
  draw(ctx) {
    let center = this.elm.trf.transform(new Vector(0,0));
    let path = new Path2D();
    path.arc(...center.get(), this.radius, 0, 2*Math.PI);
    ctx.fillStyle = '#F00';
    // ctx.strokeStyle = '#000';
    ctx.lineWidth = this.radius;
    // ctx.stroke(path);
    ctx.fill(path); // NOTE: Styles are ignored
  }
}
