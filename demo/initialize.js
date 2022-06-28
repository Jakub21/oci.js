const FPS = 120;
let FRAME = 0;
let elms = {};

class FpsMeter {
  constructor(deltas=20) {
    this.maxDeltasLength = deltas;
    this.lastTickTime = Date.now();
    this.deltas = [];
  }
  tick() {
    var now = Date.now();
    var delta = now - this.lastTickTime;
    this.lastTickTime = now;
    this.deltas.push(delta);
    if (this.deltas.length > this.maxDeltasLength) this.deltas.shift();
  }
  get() {
    var average = 0;
    for (var delta of this.deltas) average += delta;
    return 1000 / (average / this.deltas.length);
  }
}

let init = () => {
  let meter = new FpsMeter();
  let ci = new oci.CanvasInterface($.get('#Canvas').elm);
  setInterval(() => {
    $.get('#fps').prop({innerText: `FPS: ${Math.round(meter.get())}`});
  }, 1e3/5);

  let update = (time) => {
    ci.update();
    ci.view.zoom = Math.min(ci.canvas.width/(2.5e3), ci.canvas.height/2e3);
    FRAME++;
    meter.tick();
    updateAnimation(ci);
    requestAnimationFrame(update);
    // if (time < 60e3)
    // else console.log('stop');
  }

  setupAnimation(ci);
  requestAnimationFrame(update);
}

let setupAnimation = (ci) => {
  class MyElement extends oci.elm.CircleSlice {
    constructor(ci, offset) {
      let width = 100, height = 150;
      super(ci, offset, width/2, Math.PI * 1.6, -3.14/2);
      new oci.tex.Fill(this, new oci.tex.Color(255,106,146));
      this.pattern = new oci.tex.Pattern('pattern2.png');
      new oci.tex.Fill(this, this.pattern);
      new oci.tex.Outline(this, new oci.tex.Color(255,255,255), 2);
      this.trf.scale = 5;
      this.container = new oci.elm.Circle(this, new oci.Vector(), width/2);
      new oci.tex.Outline(this.container, new oci.tex.Color(255,255,255), 12);
    }
  }
  elms.first = new MyElement(ci, new oci.Vector(500,600));
}

let delta = 0.04;
let threshold = delta*2;
let updateAnimation = (ci) => {
  // elms.first.baseAngle -= delta;
  elms.first.span += 2*delta;
  if (elms.first.span > 2*Math.PI-threshold) elms.first.span = 0;// delta *= -1;
  // if (elms.first.span < threshold) delta *= -1;
}
