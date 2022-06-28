const Component = require('./Component');

module.exports = class Outline extends Component {
  constructor(elm, style, lineWidth, lineCap, lineJoin) {
    super(elm);
    this.style = style;
    this.lineWidth = lineWidth;
    this.lineCap = lineCap;
    this.lineJoin = lineJoin;
  }
  draw(ctx, path) {
    this.style.apply(this.constructor.name, ctx);
    ctx.lineWidth = this.lineWidth;
    ctx.lineCap = this.lineCap;
    ctx.lineJoin = this.lineJoin;
    ctx.stroke(path);
  }
}
