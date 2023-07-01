import Component from '../Component.js';

export default class Shadow extends Component {
  constructor(style, offset, blur) {
    super();
    this.style = style;
    this.offset = offset;
    this.blur = blur;
  }
  draw(ctx, path) {
    // TODO
  }
}
