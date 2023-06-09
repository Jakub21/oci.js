import * as oci from '../../oci.js';
import * as setup from './setup.js';

let editor, KEYBOARD;

class ImageRect extends oci.elm.poly.Polygon {
  constructor(ci, path, scale=1) {
    super(ci, [new oci.Vector()]);
    this.trnf.scale(scale);
    this.imf = new oci.tex.ImageFill(this, path);
    new oci.tex.Outline(this, new oci.tex.Color(150, 255, 150, 100));
    // new oci.tex.Center(this);
    new oci.tex.JointAnchor(this);
    this.imf.image.on('load', (evt) => {
      let img = evt.target;
      let size = new oci.Vector(img.naturalWidth, img.naturalHeight);
      this.vertices = [];
      this.vertices.push(new oci.Vector(size.x/2, size.y/2));
      this.vertices.push(new oci.Vector(-size.x/2, size.y/2));
      this.vertices.push(new oci.Vector(-size.x/2, -size.y/2));
      this.vertices.push(new oci.Vector(size.x/2, -size.y/2));
      this.triangulate();
      this.box = oci.Box.FromVertices(this.vertices);
      this.imf.transform(oci.Matrix.Translation(new oci.Vector(-size.x/2, -size.y/2)));
    });
  }
}

class Editor extends oci.core.CanvasInterface {
  constructor(canvas) {
    super(canvas.elm);
    this.meter = new FpsMeter();
    this.steps = {
      movement: 10,
      scale: 0.05,
      rotation: Math.PI/12,
    };
    this.settings = {
      instantSnap: false,
    };
    this.selected = {
      cpx: undefined, limb: undefined, joint: undefined
    }
    this.named = {};
    setup.setupImport(this);
    setup.setupExport(this);
    setup.setupEditorValues(this);
    setup.setupComplexEditor(this);
    setup.setupLimbEditor(this);
    requestAnimationFrame(() => {this.update()});
  }
  assignNamed(name, cpx) {
    this.named[name] = cpx;
  }
  update() {
    super.update();
    this.meter.tick();
    requestAnimationFrame(() => {this.update()});
  }
  generateData() {
    let data = [];
    for (let [name, cpx] of Object.entries(this.named)) {
      let entry = {name, cpx:cpx.generateData()};
      data.push(entry);
    }
    return {data};
  }
  importData(data) {
    for (let {name, cpx:cpxData} of data) {
      this.assignNamed(oci.cpx.Complex.Import(this, cpxData));
    }
  }
}

window.onload = () => {
  KEYBOARD = new $.Keyboard();
  editor = new Editor($.get('#Canvas'));
}
