
module.exports = class Shadow {
  constructor() {
    this.none = false;
  }
  static None() {
    const shadow = new Shadow();
    shadow.none = true;
    return shadow;
  }
}
