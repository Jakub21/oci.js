const Polygon = require('./Polygon');
const Vector = require('../core/Vector');

module.exports = class Rectangle extends Polygon {
  constructor(ci, pos, width, height, zIndex) {
    let vertices = Rectangle.generateVertices(width, height);
    super(ci, pos, vertices, zIndex);
    this.width = width;
    this.height = height;
  }
  static generateVertices(width, height) {
    let vertices = [];
    vertices.push(new Vector(width/2, height/2));
    vertices.push(new Vector(-width/2, height/2));
    vertices.push(new Vector(-width/2, -height/2));
    vertices.push(new Vector(width/2, -height/2));
    return vertices;
  }
}
