const Element = require('../core/Element');
const Joint = require('./Joint');

class Complex extends Element {
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
        this.joints[ID] = new Joint(this, prm, parentID);
      },
    }};
  }
  getJoint(limbID) {
    return this.joints[limbID];
  }
  draw(ctx) {
    if (this._root == undefined) return;
    this._root.draw(ctx);
    for (let [key, joint] of Object.entries(this.joints)) {
      joint.update();
      this.limbs[key].draw(ctx);
    }
  }
  generateData() {
    let data = super.generateData();
    data.ID = this._editorName;
    data._R = this._root.generateData();
    data._Ls = [];
    for (let [ID, limb] of Object.entries(this.limbs)) {
      let joint = this.joints[ID];
      data._Ls.push({ID, L:limb.generateData(), J:joint.generateData()});
    };
    return data;
  }
  static Import(parent, cpxData) {
    let cpx = new Complex(parent);
    console.log(cpxData);
    return cpx;
  }
}
module.exports = Complex;
