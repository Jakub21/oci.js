import * as oci from '../oci.js';

let canvas = $.get('#Canvas');
let ci = new oci.core.CanvasInterface(canvas.elm);
ci.view.offset.add(new oci.geo.Vector(1920/3, 1080/3));
ci.view.scale = 0.66;

let purple = new oci.tex.Texture([
  new oci.tex.components.Fill(new oci.tex.styles.Color(178, 0, 255)),
  new oci.tex.components.Outline(new oci.tex.styles.Color(0, 0, 0), 3),
]);
let texture = new oci.tex.Texture([
  new oci.tex.components.Fill(new oci.tex.styles.Image('img/texture.png')),
  new oci.tex.components.Outline(new oci.tex.styles.Color(0, 0, 0), 3),
]);
let blue = new oci.tex.Texture([
  new oci.tex.components.Fill(new oci.tex.styles.Color(50, 50, 200)),
  new oci.tex.components.Outline(new oci.tex.styles.Color(0, 0, 0), 1),
]);
let gray = new oci.tex.Texture([
  new oci.tex.components.Outline(new oci.tex.styles.Color(100, 100, 100), 1),
]);

let grid = 200;
let small = new oci.elm.polygon.Rectangle({x:grid-10, y:grid-10});

for (let x = 0; x <= 2020; x+=grid) {
  for (let y = 0; y <= 1180; y+=grid) {
    let gridElm = new oci.elm.Element(ci, 10, small, gray);
    gridElm.trnf.move(new oci.geo.Vector(x-grid/2, y-grid/2));
  }
}

let square = new oci.elm.polygon.Rectangle({x:100, y:150});
let elm1 = new oci.elm.Element(ci, 10, square, texture);
elm1.trnf.move(new oci.geo.Vector(1920/4, 1080/2));

let circle = new oci.elm.polygon.Rectangle({x:30, y:20});
let elm2 = new oci.elm.Element(elm1, 0, circle, purple);
elm2.trnf.move(new oci.geo.Vector(-50, 30)).rotate(-0.3);
let elm3 = new oci.elm.Element(elm1, 0, circle, purple);
elm3.trnf.move(new oci.geo.Vector(50, 30)).rotate(0.3);

let elm4 = new oci.elm.Element(elm1, 0,
  new oci.elm.polygon.Rectangle({x:80, y:30}), blue);
elm4.trnf.move(new oci.geo.Vector(0, 40));

let elm5 = new oci.elm.Element(elm1, 0,
  new oci.elm.polygon.Rectangle({x:80, y:15}), blue);
elm5.trnf.move(new oci.geo.Vector(0, -40));



const m = 10;
let mouse = {x: 0, y:0};
let f = 0;

setInterval(() => {
  ci.view.offset.sub(new oci.geo.Vector(f%8 >= 4? 1 : -1, f%4 >= 2? 1 : -1));
  ci.view.rotation -= f%2 >= 1? -0.001 : 0.001;
}, 1e3/60);

let interval = setInterval(() => {
  elm1.trnf.rotate(0.01825).move(new oci.geo.Vector(Math.sin(f)*m, Math.cos(f)*m));
}, 1e3/60);

// setTimeout(() => {
//   clearInterval(interval);
// }, 1.5e3);

let nextFrame = () => {
  ci.update();
  f += 0.01;
  let mouseOn = elm1.intersects(new oci.geo.Vector(mouse.x, mouse.y));
  $.get('#Output').prop({innerText: mouseOn? 'YES' : 'NO'})
    ._s.style({left: `${mouse.x}px`, top: `${mouse.y+30}px`});
  requestAnimationFrame(nextFrame);
}

canvas.on('mousemove', (evt) => {
  mouse.x = evt.clientX;
  mouse.y = evt.clientY;
});

requestAnimationFrame(nextFrame);
