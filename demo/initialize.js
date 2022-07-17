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
  // elms.first = new MyElement(ci, new oci.Vector(500,600));

  class Body extends oci.elm.Rectangle {
    constructor(ci, offset) {
      super(ci, offset, 200, 257);
      // new oci.tex.Outline(this, new oci.tex.Color(100, 255, 150));
      this.fill = new oci.tex.Image('./img/body_up.png');
      new oci.tex.Fill(this, this.fill);
      // new oci.tex.Fill(this, new oci.tex.Color(255, 106, 146));
      this.trf.move(new oci.Vector(100,400));
      this.trf.scale(0.5);
      // this.trf.rotate(1);

      this.head = new oci.elm.Rectangle(this, new oci.Vector(0, 0), 152, 186);
      // new oci.tex.Outline(this.head, new oci.tex.Color(100, 255, 150));
      this.head.trf.offset(new oci.Vector(0, -50));
      this.head.trf.move(new oci.Vector(20, -175));
      this.head.trf.rotate(Math.PI/6);
      this.headFill = new oci.tex.Image('./img/head.png');
      new oci.tex.Fill(this.head, this.headFill);

      this.guts = new oci.elm.Rectangle(this, null, 200, 300);
      // new oci.tex.Outline(this.guts, new oci.tex.Color(100, 255, 150));
      this.guts.trf.move(new oci.Vector(0, 230));
      this.gutsFill = new oci.tex.Image('./img/body_down.png');
      new oci.tex.Fill(this.guts, this.gutsFill);

      let legoffset = Math.PI * 0.08;
      this.leftLegUp = new oci.elm.Rectangle(this.guts, null, 200, 300);
      // new oci.tex.Outline(this.leftLegUp, new oci.tex.Color(100, 255, 150));
      this.leftLegUp.trf.rotate(-Math.PI/6+legoffset);
      this.leftLegUp.trf.move(new oci.Vector(10, 85));
      this.leftLegUp.trf.offset(new oci.Vector(0, 85));
      this.leftLegUpFill = new oci.tex.Image('./img/leg_up.png');
      new oci.tex.Fill(this.leftLegUp, this.leftLegUpFill);

      let q = 350;
      this.leftLegDown = new oci.elm.Rectangle(this.leftLegUp, null, q*0.306, q);
      // new oci.tex.Outline(this.leftLegDown, new oci.tex.Color(100, 255, 150));
      this.leftLegDown.trf.move(new oci.Vector(-50, 150));
      this.leftLegDown.trf.offset(new oci.Vector(0, 155));
      this.leftLegDownFill = new oci.tex.Image('./img/leg_down.png');
      new oci.tex.Fill(this.leftLegDown, this.leftLegDownFill);

      this.rightLegUp = new oci.elm.Rectangle(this.guts, null, 200, 300);
      // new oci.tex.Outline(this.rightLegUp, new oci.tex.Color(100, 255, 150));
      this.rightLegUp.trf.rotate(Math.PI/6+legoffset);
      this.rightLegUp.trf.move(new oci.Vector(10, 85));
      this.rightLegUp.trf.offset(new oci.Vector(0, 85));
      this.rightLegUpFill = new oci.tex.Image('./img/leg_up.png');
      new oci.tex.Fill(this.rightLegUp, this.rightLegUpFill);

      this.rightLegDown = new oci.elm.Rectangle(this.rightLegUp, null, q*0.306, q);
      // new oci.tex.Outline(this.rightLegDown, new oci.tex.Color(100, 255, 150));
      this.rightLegDown.trf.move(new oci.Vector(-50, 150));
      this.rightLegDown.trf.offset(new oci.Vector(0, 155));
      this.rightLegDownFill = new oci.tex.Image('./img/leg_down.png');
      new oci.tex.Fill(this.rightLegDown, this.rightLegDownFill);

      this.armUp = new oci.elm.Rectangle(this, null, 100, 350);
      // new oci.tex.Outline(this.armUp, new oci.tex.Color(100, 255, 150));
      this.armUp.trf.rotate(-Math.PI/6);
      this.armUp.trf.move(new oci.Vector(-10, -25));
      this.armUp.trf.offset(new oci.Vector(0, 100));
      this.armUpFill = new oci.tex.Image('./img/arm_up.png');
      new oci.tex.Fill(this.armUp, this.armUpFill);

      let w = 350;
      this.armDown = new oci.elm.Rectangle(this.armUp, null, w*0.22101, w);
      // new oci.tex.Outline(this.armDown, new oci.tex.Color(100, 255, 150));
      this.armDown.trf.move(new oci.Vector(0, 60));
      this.armDown.trf.offset(new oci.Vector(0, 140));
      this.armDownFill = new oci.tex.Image('./img/arm_down.png');
      new oci.tex.Fill(this.armDown, this.armDownFill);

    }
    update() {
      // this.trf.rotate(-0.002);
      // this.trf.scale(1.001);
      let timescale = 20;
      this.trf.move(new oci.Vector(2,0).mult(0.2*Math.cos((FRAME+15)/(timescale/2))+1));
      this.trf.move(new oci.Vector(0,1.5).mult(Math.sin(FRAME/(timescale/2))));
      this.trf.rotate(-0.0025 * Math.sin(FRAME/timescale));
      this.head.trf.rotate(-0.005 * Math.sin(FRAME/timescale));
      this.guts.trf.rotate(0.0005 * Math.sin(FRAME/timescale));
      this.leftLegUp.trf.rotate(-0.03 * -Math.sin(FRAME/timescale));
      this.leftLegDown.trf.rotate(-0.02 * Math.sin(FRAME/timescale));
      this.rightLegUp.trf.rotate(-0.03 * Math.sin(FRAME/timescale));
      this.rightLegDown.trf.rotate(-0.02 * Math.sin(FRAME/timescale));
      this.armUp.trf.rotate(0.02 * Math.sin(FRAME/timescale));
      this.armDown.trf.rotate(0.015 * Math.sin(FRAME/timescale));
      this.fill.align(this);
      this.headFill.align(this.head);
      this.gutsFill.align(this.guts);
      this.leftLegUpFill.align(this.leftLegUp);
      this.leftLegDownFill.align(this.leftLegDown);
      this.rightLegUpFill.align(this.rightLegUp);
      this.rightLegDownFill.align(this.rightLegDown);
      this.armUpFill.align(this.armUp);
      this.armDownFill.align(this.armDown);
    }
  }

  class Moon extends oci.elm.Rectangle {
    constructor(ci) {
      super(ci, new oci.Vector(0,0), 100, 100);
      this.trf.move(new oci.Vector(200, 2*1080-250));
      // new oci.tex.Outline(this, new oci.tex.Color(100, 255, 150));
      this.img = new oci.tex.Image('./img/moon.png');
      new oci.tex.Fill(this, this.img);
    }
  }

  class Planet extends oci.elm.Rectangle {
    constructor(ci) {
      super(ci, null, 100, 100);
      this.trf.move(new oci.Vector(1920*3/4, 1080*1/4));
      this.img = new oci.tex.Image('./img/planet.png');
      new oci.tex.Fill(this, this.img);
    }
  }

  elms.planet = new Planet(ci);
  elms.surface = new Moon(ci);
  elms.body = new Body(ci);
}

let updateAnimation = (ci) => {
  elms.body.update();
  // elms.surface.img.align(elms.surface);
  elms.planet.img.align(elms.planet);
}
