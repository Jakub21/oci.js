import Matrix from '../../geometry/Matrix.js';
import Component from '../Component.js';

export default class ImageFill extends Component {
  constructor(path, matrix) {
    super();
    this.path = path;
    this.image = $.make('img').prop({src:this.path});
    this.matrix = matrix || new Matrix();
  }
  generateData() {
    let data = super.generateData();
    data.path = this.path;
    return data;
  }
  transform(other) {
    this.matrix.mult(other);
  }
  draw(ctx, path) {
    ctx.save();
    ctx.transform(...this.matrix.getDOMValues());
    ctx.drawImage(this.image.elm, 0, 0);
    ctx.restore();
  }
  // does not work with proper OOP
  // size is required in a constructor so async/promise cant be used
  // static ReadNaturalSize(path) {
  //   return new Promise((resolve, reject) => {
  //     let img = $.make('img').prop({src:path});
  //     img.on('load', (evt) => {
  //       let img = evt.target;
  //       resolve(new Vector(img.naturalWidth, img.naturalHeight));
  //     }).on('error', (evt) => {
  //       reject('Image load error')
  //     });
  //   })
  // }
}
