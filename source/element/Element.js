import Transform from '../geometry/Transform.js';
import {generateUID} from '../core/common.js';
import ElementStore from '../core/ElementStore.js'
import Texture from '../texture/Texture.js';
import Shape from './shapeFactory.js';
import Matrix from '../geometry/Matrix.js';


export default class Element {
  constructor(parent, zIndex=0, shape, tex, trnf) {
    this.parent = parent;
    parent.attach(this);
    this.id = generateUID();
    this.zIndex = zIndex;
    this.shape = shape || new Shape();
    this.tex = tex || new Texture();
    this.trnf = trnf || new Transform();
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
    // $.get('#Output').prop({innerText: `${vector.str()}\n${relative.str()}`});
    return this.shape.intersects(relative) || this.subElements.intersectsAny(vector);
  }
}
