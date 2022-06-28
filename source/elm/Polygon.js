const Element = require('../core/Element');
const Box = require('../core/Box');
const Triangle = require('../core/Triangle');
const Line = require('../core/Line');

module.exports = class Polygon extends Element {
  constructor(ci, pos, vertices, zIndex) {
    super(ci, pos, zIndex);
    this.vertices = vertices;
    this.triangles = this.triangulate();
  }
  draw(ctx) {
    let path = new Path2D();
    let vertices = [];
    this.vertices.map(v => {
      vertices.push(this.trf.toAbs(this.trf.transform(v)))});
    path.moveTo(...vertices.slice(-1)[0].get());
    for (let vertex of vertices) {
      path.lineTo(...vertex.get());
    }
    this.tex.draw(ctx, path);
    // this._drawCenter(ctx);
    // this.getBoxAbs().draw(ctx);
    // this._drawTriangles(ctx);
  }
  // _drawTriangles(ctx) { // TODO
  //   ctx.lineWidth = 1;
  //   ctx.strokeStyle = '#0F0';
  //   ctx.fillStyle = '#0F02';
  //   for (let tr of this.triangles) {
  //     let a = this.trf.toAbs(this.trf.transform(tr.va));
  //     let b = this.trf.toAbs(this.trf.transform(tr.vb));
  //     let c = this.trf.toAbs(this.trf.transform(tr.vc));
  //     ctx.beginPath(); ctx.moveTo(...c.get());
  //     ctx.lineTo(...a.get());ctx.lineTo(...b.get());ctx.lineTo(...c.get());
  //     ctx.stroke();
  //     ctx.fill();
  //   }
  // }
  intersects(vector) {
    // Box check
    if (!this.getBoxAbs(this.vertices).intersects(vector)) return false;
    // Triangles
    vector = this.trf.reverse(this.trf.toRel(vector));
    return this.triangles.map(t => {
      return t.intersects(vector)}).includes(true);
  }
  triangulate() {
    const sign = (n) => {if (!n) return 0; return (n>0)? 1 : -1;};
    // Create edges
    let edges = [];
    for (let idx=0; idx<this.vertices.length; idx++) {
      let line = new Line(this.vertices[idx],
        this.vertices[idx+1] || this.vertices[0]);
      edges.push(line);
    }
    this.edges = edges;
    // Find vertices direction
    // let total = 0;
    // edges.map((line, idx) => {
    //   let next = edges[idx+1] || edges[0];
    //   total += line.angleTo(next);
    // });
    // console.log('total', total);
    let total = 1;
    // Find valid triangles
    let threshold = this.vertices.length ** 3;
    let triangles = [];
    let vertices = this.vertices.slice();
    let lidx = 0;
    while (vertices.length) {
      if (lidx == threshold) {
        console.error('Emergency break');
        break;
      }
      lidx += 1;
      for (let idx=0; idx<vertices.length; idx++) {
        let va = vertices[idx];
        let vb = vertices[(idx+1) % vertices.length];
        let vc = vertices[(idx+2) % vertices.length];
        let tr = new Triangle(va, vb, vc);
        let valid = true;
        for (let v of this.vertices) {
          if (v == va || v == vb || v == vc) continue;
          if (tr.intersects2(v)) { valid = false; break; }
        }
        if (!valid) continue;
        let angleSign = new Line(va, vb).angleSignTo(vc);
        if ((angleSign != sign(total)) && (angleSign != 0)) continue;
        vertices = vertices.filter(v=>{return v != vb}); // TODO
        if (!tr.zeroArea()) triangles.push(tr);
      }
    }
    return triangles;
  }
  getBoxAbs() {
    let vertices = [];
    this.vertices.map(v => {
      vertices.push(this.trf.toAbs(this.trf.transform(v)));
    });
    let box = Box.FromVerticesAbs(vertices);
    // box.applyOutlineWidth(this.tex.lineWidth);
    return box;
  }
}
