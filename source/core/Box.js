
export default class Box {
  constructor(xmin, ymin, xmax, ymax) {
    this.xmin = xmin;
    this.ymin = ymin;
    this.xmax = xmax;
    this.ymax = ymax;
  }
  static FromVertices(points) {
    const funcMin = (a,b) => {return (a<b)? a : b;};
    const funcMax = (a,b) => {return (a>b)? a : b;};
    const xs = points.map(p=>{return p.x});
    const ys = points.map(p=>{return p.y});
    return new Box(xs.reduce(funcMin), ys.reduce(funcMin), xs.reduce(funcMax), ys.reduce(funcMax));
  }
  intersects(v) {
    return (v.x >= this.xmin && v.x <= this.xmax) &&
      (v.y >= this.ymin && v.y <= this.ymax);
  }
}
