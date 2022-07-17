const Component = require('./Component');

module.exports = class Fill extends Component {
  constructor(elm, style) {
    super(elm);
    this.style = style;
  }
  draw(ctx, path) {
    this.style.apply(this.constructor.name, ctx);
    let fs_path = new Path2D();
    fs_path.moveTo(-1920, -1080);
    fs_path.lineTo(1920, -1080);
    fs_path.lineTo(1920, 1080);
    fs_path.lineTo(-1920, 1080);
    fs_path.closePath();
    ctx.fill(fs_path);
  }
}
