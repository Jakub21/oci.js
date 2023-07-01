import Matrix from "../../geometry/Matrix.js";
import Vector from "../../geometry/Vector.js";
import Pattern from "./Pattern.js";

export default class Image extends Pattern {
  constructor(path) {
    super(path, 'no-repeat');
  }
  apply(mode, ctx) {
    if (!this.ready) return;
    // let matrix = ctx.getTransform();
    // $.get('#Output').prop({innerText: `${matrix}`});
    // this.pattern.setTransform(matrix);
    let matrix = Matrix.Translation(
      new Vector(-this.img.elm.naturalWidth/2, -this.img.elm.naturalHeight/2)
    );
    this.pattern.setTransform(matrix.getDOMMatrix());
    super.apply(mode, ctx);
  }
}
