import Component from './Component.js';

export default class Shadow extends Component {
  constructor(elm, style, offset, blur) {
    super(elm);
    this.style = style;
    this.offset = offset;
    this.blur = blur;
  }
  draw(ctx, path) {
    // TODO
  }
}
