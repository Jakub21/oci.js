import * as oci from '../oci.js';

const HEIGHT = 1080;
const WIDTH = 1920;

let canvas = $.get('#Canvas');
let ci = new oci.core.CanvasInterface(canvas.elm);

let ground = new oci.elm.Element(ci, {
  shape: new oci.elm.polygon.Rectangle({x:WIDTH, y:100}),
  transform: new oci.geo.Transform({ax: WIDTH/2, ay: HEIGHT-50}),
  texture: new oci.tex.Texture([
    new oci.tex.components.Fill(new oci.tex.styles.Color(60, 60, 20)),
  ]),
})


const blackOutline = new oci.tex.components.Outline(new oci.tex.styles.Color(0, 0, 0), 1);

const CFG = {
  freq: 0.6,
  zeta: 1,
  init: 0,
  interval: 300,
  jump: new oci.geo.Vector(3, 2),
  speed: 4,
  textureNear: new oci.tex.Texture([
    new oci.tex.components.Fill(new oci.tex.styles.Color(150, 100, 50)), blackOutline
  ]),
  textureFar: new oci.tex.Texture([
    new oci.tex.components.Fill(new oci.tex.styles.Color(70, 50, 30)), blackOutline
  ]),
}


let makeModelData = (data) => { return {
    tree: {hindA: {hindB: {hindC: null}}},
    states: data.states,
    elementData: {
      hindA: {
        shape: new oci.elm.polygon.Rectangle({x:60, y:100}),
        transform: new oci.geo.Transform({ax: data.pos.x, ay: data.pos.y, oy:50}),
        texture: data.texture,
        joint: new oci.kine.Joint({damp:{freq: CFG.freq, zeta: CFG.zeta, init: CFG.init}}),
      },
      hindB: {
        shape: new oci.elm.polygon.Rectangle({x:50, y:120}),
        transform: new oci.geo.Transform({ax: 0, ay: 40, oy:40}),
        texture: data.texture,
        joint: new oci.kine.Joint({damp:{freq: CFG.freq, zeta: CFG.zeta, init: CFG.init}}),
      },
      hindC: {
        shape: new oci.elm.polygon.Rectangle({x:30, y:120}),
        transform: new oci.geo.Transform({ax: 0, ay: 40, oy: 40}),
        texture: data.texture,
        joint: new oci.kine.Joint({damp:{freq: CFG.freq, zeta: CFG.zeta, init: CFG.init}}),
      },
  }};
}

const A = 1;
const B = 1.5;
const C = 1.5;

const hindStates = {
  s1: {hindA: A, hindB: -B*1.25, hindC: C},
  s2: {hindA: A, hindB: 0.75, hindC: 0},
  s3: {hindA: -A, hindB: 0.75, hindC: 0},
  s4: {hindA: -A, hindB: -B*1.25, hindC: C/4},
};

const foreStates = {
  s1: {hindA: -A, hindB: 0, hindC: 0},
  s2: {hindA: -A, hindB: B, hindC: -C},
  s3: {hindA: A, hindB: B, hindC: -C},
  s4: {hindA: A, hindB: 0, hindC: 0},
};

let base = new oci.elm.Element(ci, {
  shape: new oci.elm.polygon.Rectangle({x:300, y:100}),
  transform: new oci.geo.Transform({ax: -150, ay: HEIGHT-200, s: 0.5}),
  texture: new oci.tex.Texture([
    new oci.tex.components.Fill(new oci.tex.styles.Color(120, 100, 70)), blackOutline
  ]),
  kinetics: new oci.kine.Kinetics({
    velocity: new oci.geo.Vector(CFG.speed, CFG.jump.y/2),
  }),
});

let hindFar = new oci.kine.Model(base, makeModelData({
  texture: CFG.textureFar, states: hindStates, pos: {x:-120, y: 0}
}));
let foreFar = new oci.kine.Model(base, makeModelData({
  texture: CFG.textureFar, states: foreStates, pos: {x:120, y: 0}
}));

let baseCover = new oci.elm.Element(base, {
  shape: new oci.elm.polygon.Rectangle({x:300, y:100}),
  texture: new oci.tex.Texture([
    new oci.tex.components.Fill(new oci.tex.styles.Color(120, 100, 70)), blackOutline
  ]),
});
let head = new oci.elm.Element(base, {
  shape: new oci.elm.polygon.Rectangle({x:100, y:70}),
  transform: new oci.geo.Transform({ax: 150, ay: -50, r: -0.2}),
  texture: new oci.tex.Texture([
    new oci.tex.components.Fill(new oci.tex.styles.Color(120, 100, 70)), blackOutline
  ]),
});

let hindNear = new oci.kine.Model(base, makeModelData({
  texture: CFG.textureNear, states: hindStates, pos: {x:-120, y: 0}
}));
let foreNear = new oci.kine.Model(base, makeModelData({
  texture: CFG.textureNear, states: foreStates, pos: {x:120, y: 0}
}));


let stage = 0;

let updateElement = () => {
  console.log(base.kinetics.acceleration);
  switch (stage) {
    case 0:
      hindNear.state('s1');
      foreNear.state('s1');
      hindFar.state('s3');
      foreFar.state('s3');
      base.kinetics.addVelocity(new oci.geo.Vector(-CFG.jump.x, -CFG.jump.y));
      break;
    case 1:
      hindNear.state('s2');
      foreNear.state('s2');
      hindFar.state('s4');
      foreFar.state('s4');
      base.kinetics.addVelocity(new oci.geo.Vector(CFG.jump.x, CFG.jump.y));
      break;
    case 2:
      hindNear.state('s3');
      foreNear.state('s3');
      hindFar.state('s1');
      foreFar.state('s1');
      base.kinetics.addVelocity(new oci.geo.Vector(-CFG.jump.x, -CFG.jump.y));
      break;
    case 3:
      hindNear.state('s4');
      foreNear.state('s4');
      hindFar.state('s2');
      foreFar.state('s2');
      base.kinetics.addVelocity(new oci.geo.Vector(CFG.jump.x, CFG.jump.y));
      break;
  }
  stage = (stage+1) % 4;
}
setInterval(updateElement, CFG.interval);

let nextFrame = () => {
  ci.update();
  requestAnimationFrame(nextFrame);
}

requestAnimationFrame(nextFrame);
