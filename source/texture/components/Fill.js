
export default class Fill {
  constructor(style) {
    super();
    this.style = style;
  }
  draw(ctx, path) {
    this.style.apply(this.constructor.name, ctx);
    ctx.fill(path);
  }
}
