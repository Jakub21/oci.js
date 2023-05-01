import Component from './Component.js';

export default class JointAnchor extends Component {
  constructor(elm, radius=8) {
    super(elm);
    this.elm = elm;
    this.radius = radius;
  }
  draw(ctx) {
    // NOTE: Styles are ignored
    // NOTE: Assumes no only transform other than scale of the limb itself
    let joint = this.elm.trf.parent.elm;
    if (joint == undefined) return;
    if (joint.constructor.name != 'Joint') return;
    let v = joint.current._offset.copy();
    let radius = 8 / this.elm.trf._scale;
    v.mult(-1/this.elm.trf._scale);
    let path = new Path2D();
    path.arc(...v.get(), radius, 0, 2*Math.PI);
    ctx.fillStyle = '#090';
    ctx.strokeStyle = '#3F3';
    ctx.lineWidth = radius;
    ctx.stroke(path);
    ctx.fill(path);
  }
}
