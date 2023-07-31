import Transform from '../geometry/Transform.js';
import {generateUID} from '../core/common.js';
import ElementStore from '../core/ElementStore.js'
import Texture from '../texture/Texture.js';
import Matrix from '../geometry/Matrix.js';


export default class Element {
  constructor(parent, data) {
    this.parent = parent;
    parent.attach(this);
    this.id = generateUID();
    this.shape = data.shape;
    this.tex = data.texture || new Texture();
    this.trnf = data.transform || new Transform();
    this.zIndex = data.zIndex || this.parent.getAutoZ();
    this.subElements = new ElementStore();
    this.absolute = new Matrix();
  }
  draw(ctx) {
    ctx.save();
    this.trnf.apply(ctx);
    this.absolute = Matrix.FromDOM(ctx.getTransform());
    this.tex.draw(ctx, this.shape.generatePath());
    this.subElements.draw(ctx);
    ctx.restore();
  }
  attach(other) {
    this.subElements.attach(other);
  }
  intersects(vector) {
    vector.z = 1; // Otherwise translation is multiplied by 0
    let relative = this.absolute.inverse().apply(vector.copy());
    return this.shape.intersects(relative) || this.subElements.intersectsAny(vector);
  }
  getAutoZ() {
    return this.zIndex + 0.01; // TODO #14
  }
}
