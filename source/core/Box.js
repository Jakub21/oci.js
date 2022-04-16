
module.exports = class Box {
  constructor(xmin, ymin, xmax, ymax) {
    this.xmin = xmin;
    this.ymin = ymin;
    this.xmax = xmax;
    this.ymax = ymax;
  }
  static FromVerticesAbs(points) {
    const funcMin = (a,b) => {return (a<b)? a : b;};
    const funcMax = (a,b) => {return (a>b)? a : b;};
    const xs = points.map(p=>{return p.x});
    const ys = points.map(p=>{return p.y});
    return new Box(xs.reduce(funcMin), ys.reduce(funcMin), xs.reduce(funcMax), ys.reduce(funcMax));
  }
  static FromVerticesRel(center, points) {
    points.map((v, i) => {points[i] = v.copy().add(center);});
    return Box.FromVerticesAbs(points);
  }
  // applyOutlineWidth(width) {
  //   width = Math.ceil(width/2);
  //   this.xmin -= width;
  //   this.ymin -= width;
  //   this.xmax += width;
  //   this.ymax += width;
  // }
  intersects(v) {
    return (v.x >= this.xmin && v.x <= this.xmax) &&
      (v.y >= this.ymin && v.y <= this.ymax);
  }
  draw(ctx) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#FFF';
    ctx.beginPath();
    ctx.moveTo(this.xmin, this.ymin);
    ctx.lineTo(this.xmin, this.ymax);
    ctx.lineTo(this.xmax, this.ymax);
    ctx.lineTo(this.xmax, this.ymin);
    ctx.lineTo(this.xmin, this.ymin);
    ctx.stroke();
  }
}
