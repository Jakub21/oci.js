import Polygon from './Polygon.js';
import Vector from '../core/Vector.js';

export default class Rectangle extends Polygon {
  constructor(ci, width, height, zIndex) {
    let vertices = Rectangle.generateVertices(width, height);
    super(ci, vertices, zIndex);
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
