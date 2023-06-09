import Transform from '../geometry/Transform.js';
import {generateUID} from '../core/common.js';
import ElementStore from '../core/ElementStore.js'
import Texture from '../texture/Texture.js';
import Shape from './shapeFactory.js';

let NEXT_Z_IDX = 0;


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
  }
  draw(ctx) {
    ctx.save();
    this.trnf.apply(ctx);
    this.tex.draw(ctx, this.shape.generatePath());
    this.subElements.draw(ctx);
    ctx.restore();
  }
  attach(other) {
    this.subElements.attach(other);
  }
}
