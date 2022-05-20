const FPS = 120;
let FRAME = 0;

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
    ci.update();
    ci.view.zoom = Math.min(ci.canvas.width/(9.5*250+175), ci.canvas.height/2e3);
    FRAME++;
    meter.tick();
  }, 1e3/FPS);
  setInterval(() => {
    $.get('#fps').prop({innerText: `FPS: ${Math.round(meter.get())}`});
  }, 1e3/5);

  let regulars = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((s) => {
    let reg = new oci.elm.RegularPolygon(ci, new oci.Vector((s-2.5)*250, 300), s, 100);
    reg.tex.lineWidth = 3;
    reg.tex.outline = new oci.Color(255, 255, 255);
    reg.tex.fill = new oci.Color(75, s*15, 255-(s*15));
    setInterval(() => {
      reg.trf.rotate += 0.005;
    }, 1e3/FPS);
  })

  let stars = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((s) => {
    let reg = new oci.elm.StarPolygon(ci, new oci.Vector((s-2.5)*250, 600), s, 100-((13-s)*8), 100);
    reg.tex.lineWidth = 3;
    reg.tex.outline = new oci.Color(255, 255, 255);
    reg.tex.fill = new oci.Color(75, 255-s*15, s*15);
    setInterval(() => {
      reg.trf.rotate -= 0.005;
    }, 1e3/FPS);
  })

  let rsverts = oci.Vector.Array([
    // [100, 0], [110, 50], [80, 50], [60, 40]
    [90, -15], [120, -8], [120, 8], [90, 15]
  ]);
  let radials = [5, 8, 10, 12, 14].map((s, idx) => {
    let radial = new oci.elm.RadialPolygon(ci, new oci.Vector(idx*450+375, 1000), s, rsverts);
    radial.trf.scale = 1.25;
    radial.tex.lineWidth = 3;
    radial.tex.outline = new oci.Color(255, 255, 255);
    radial.tex.fill = new oci.Color(200, 40, 80);
    setInterval(() => {
      radial.trf.rotate += 0.005;
    }, 1e3/FPS);
    return radial;
  });

  let xsverts = oci.Vector.Array([
    [100, -100], [100, -80], [120, -60], [120, -40], [80, 0], [80, 20], [100, 40], [100, 100]
  ]);
  let mirroredX = new oci.elm.MirroredPolygon(ci, new oci.Vector(200, 1400), 'x', xsverts);
  mirroredX.tex.lineWidth = 3;
  mirroredX.tex.outline = new oci.Color(255, 255, 255);
  mirroredX.tex.fill = new oci.Color(230, 150, 30);
  setInterval(() => {
    mirroredX.trf.translate.y = 50 * Math.sin(4 * FRAME/FPS);
  }, 1e3/FPS);

  let ysverts = oci.Vector.Array([
    [100, 100], [80, 100], [60, 80], [0, 80], [-20, 100], [-100, 100]
  ]);
  let mirroredY = new oci.elm.MirroredPolygon(ci, new oci.Vector(625, 1400), 'y', ysverts);
  mirroredY.tex.lineWidth = 3;
  mirroredY.tex.outline = new oci.Color(255, 255, 255);
  mirroredY.tex.fill = new oci.Color(230, 150, 30);
  setInterval(() => {
    mirroredY.trf.translate.x = 50 * Math.sin(4 * FRAME/FPS);
  }, 1e3/FPS);

  let rect = new oci.elm.Rectangle(ci, new oci.Vector(1500, 1400), 320, 200);
  rect.tex.lineWidth = 3;
  rect.tex.outline = new oci.Color(255, 255, 255);
  rect.tex.fill = new oci.Color(50, 50, 50);
  setInterval(() => {
    rect.trf.scale = (Math.sin(2 * FRAME/FPS)) * .3 + .8;
    rect.trf.rotate = Math.sin(2 * FRAME/FPS);
    rect.trf.translate.x = 150 * Math.sin(2 * FRAME/FPS);
  }, 1e3/FPS);

  let elsl = new oci.elm.EllipseSlice(ci, new oci.Vector(200, 1800),
    new oci.Vector(170, 80), 1.25*Math.PI);
  elsl.tex.lineWidth = 3;
  elsl.tex.fill = new oci.Color(160, 70, 100);
  elsl.tex.outline = new oci.Color(255, 255, 255);

  let cisl = new oci.elm.CircleSlice(ci, new oci.Vector(550, 1800),
    140, 1.25*Math.PI);
  cisl.tex.lineWidth = 3;
  cisl.tex.fill = new oci.Color(160, 70, 100);
  cisl.tex.outline = new oci.Color(255, 255, 255);

  let ellipse = new oci.elm.Ellipse(ci, new oci.Vector(900, 1800),
    new oci.Vector(170, 80));
  ellipse.tex.lineWidth = 3;
  ellipse.tex.fill = new oci.Color(160, 70, 100);
  ellipse.tex.outline = new oci.Color(255, 255, 255);

  let circle = new oci.elm.Circle(ci, new oci.Vector(1250, 1800), 140);
  circle.tex.lineWidth = 3;
  circle.tex.fill = new oci.Color(160, 70, 100);
  circle.tex.outline = new oci.Color(255, 255, 255);

  setInterval(() => {
    let speed = 1.25;
    // elsl.trf.rotate = speed*FRAME/FPS;
    // cisl.trf.rotate = speed*FRAME/FPS;
    // ellipse.trf.rotate = speed*FRAME/FPS;
    // circle.trf.rotate = speed*FRAME/FPS;
  }, 1e3/FPS);
}
