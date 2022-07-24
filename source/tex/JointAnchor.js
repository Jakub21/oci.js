const Component = require('./Component');
const Vector = require('../core/Vector');
const Matrix = require('../core/Matrix');

module.exports = class JointAnchor extends Component {
  constructor(elm, radius=8) {
    super(elm);
    this.elm = elm;
    this.radius = radius;
  }
  draw(ctx) {
    // NOTE: Styles are ignored
    // NOTE: Assumes no transform of the element itself, only joint
    let joint = this.elm.trf.parent.elm;
    if (joint == undefined) return;
    if (joint.constructor.name != 'Joint') return;
    let v = joint.current._offset;
    let point = new Vector(-v.x, -v.y);
    let path = new Path2D();
    path.arc(...point.get(), this.radius, 0, 2*Math.PI);
    ctx.fillStyle = '#090';
    ctx.strokeStyle = '#3F3';
    ctx.lineWidth = this.radius;
    ctx.stroke(path);
    ctx.fill(path);
  }
}
