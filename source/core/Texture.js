const Color = require('./Color');

module.exports = class Texture {
  constructor(lineWidth, outline, fill, image) {
    this.lineWidth = lineWidth || 1;
    this.outline = outline || Color.None();
    this.fill = fill || Color.None();
    this.image = image || undefined;
  }
}
