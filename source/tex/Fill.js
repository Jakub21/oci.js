const Component = require('./Component');

module.exports = class Fill extends Component {
  constructor(elm, style) {
    super(elm);
    this.style = style;
  }
  draw(ctx, path) {
    this.style.apply(this.constructor.name, ctx);
    ctx.fill(path);
  }
}
