
export default class Color {
  constructor(r=0, g=0, b=0, a=255) {
    this.r = Math.round(r);
    this.g = Math.round(g);
    this.b = Math.round(b);
    this.a = Math.round(a);
    this.none = false;
  }
  copy() {
    return new Color(this.r, this.g, this.b, this.a);
  }
  apply(mode, ctx) {
    if (mode == 'Fill') ctx.fillStyle = this.getHex();
    else if (mode == 'Outline') ctx.strokeStyle = this.getHex();
  }

  getHex() {
    if (this.none) return '#0000';
    let hexes = [this.r, this.g, this.b, this.a].map(c=>{return this.partHex(c)});
    return '#' + hexes.join('');
  }
  partHex(x) {
    x = Math.max(0, Math.min(Math.round(x), 255));
    x = x.toString(16);
    if (x.length == 1) x = `0${x}`;
    return x;
  }

  static None() {
    const color = new Color();
    color.none = true;
    return color;
  }
  static RGB(r=0, g=0, b=0, a=0) {
    return new Color(r, g, b, a); // only for completeness, redundand
  }
  static HSV(h=0, s=0, v=0, a=0) {
    return new Color();
  }
  static HEX(hex='#000F') {
    return new Color();
  }
}
