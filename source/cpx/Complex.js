const Element = require('../core/Element');
const Joint = require('./Joint');

module.exports = class Complex extends Element {
  constructor(ci) {
    super(ci);
    this.limbs = {};
    this.joints = {};
    this.root = {
      self:()=>{return this;},
      attach:(prm)=>{this._root=prm;},
    };
    this.limb = (ID, parentID) => {return {
      self:()=>{return this;},
      attach:(prm)=>{
        this.limbs[ID] = prm;
        // let parent = (parentID==undefined)? this : this.limbs[parentID];
        // if (parent==undefined) throw 'Ivalid joint parent';
        this.joints[ID] = new Joint(this, prm, parentID);
      },
    }};
  }
  getJoint(limbID) {
    return this.joints[limbID];
  }
  draw(ctx) {
    this._root.draw(ctx);
    for (let [key, joint] of Object.entries(this.joints)) {
      joint.update();
      this.limbs[key].draw(ctx);
    }
  }
}
