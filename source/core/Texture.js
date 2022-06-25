const Color = require('./Color');
const Font = require('./Font');
const Shadow = require('./Shadow');

const DEFAULTS = {
  lineWidth: 1,
  lineCap: 'butt', // 'round', 'square'
  lineJoin: 'miter', // 'round', 'bevel'
  outline: Color.None(),
  fill: Color.None(), // Pattern, Gradient
  font: Font.Default(),
  shadow: Shadow.None(),
}

module.exports = class Texture {
  constructor(parent={param:{}}) {
    this.param = {};
    for (let [key, val] of Object.entries(DEFAULTS)) {
      this.param[key] = parent.param[key] || val;
    }
    // this.lineWidth = parent.lineWidth || 1;
    // this.lineCap = 'butt'; // 'round', 'square'
    // this.lineJoin = 'miter'; // 'round', 'bevel'
    // this.outline = Color.None();
    // this.fill = Color.None();
    // this.image = image;
  }
  apply(ctx) {
    ctx.lineWidth = this.param.lineWidth;
    ctx.strokeStyle = this.param.outline.getHex();
    ctx.fillStyle = this.param.fill.getHex();
  }
}
