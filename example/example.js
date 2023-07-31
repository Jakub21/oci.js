import * as oci from '../oci.js';

let canvas = $.get('#Canvas');
let ci = new oci.core.CanvasInterface(canvas.elm);


let imageTexture = new oci.tex.Texture([
  new oci.tex.components.Fill(new oci.tex.styles.Pattern('./img/sample.png')),
])

let blueTexture = new oci.tex.Texture([
  new oci.tex.components.Fill(new oci.tex.styles.Color(50, 50, 200)),
  new oci.tex.components.Outline(new oci.tex.styles.Color(0, 0, 0), 1),
]);


let trunk = new oci.elm.Element(ci, {
  shape: new oci.elm.polygon.Rectangle({x:150, y:450}),
  transform: new oci.geo.Transform({ax: 600, ay: 600}),
  texture: imageTexture,
});

let branch1 = new oci.elm.Element(trunk, {
  shape: new oci.elm.polygon.Rectangle({x:50, y:150}),
  transform: new oci.geo.Transform({ax: 50, ay: -50, oy:75, r: 1.75}),
  texture: imageTexture,
});

let branch2 = new oci.elm.Element(branch1, {
  shape: new oci.elm.polygon.Rectangle({x:50, y:150}),
  transform: new oci.geo.Transform({ay: 60, oy: 60}),
  texture: imageTexture,
});

let mouse = {x: 0, y:0};
let f = 0;
let step = 0.01;

let updateElement = () => {
 if (branch1.trnf._rotation > 2.5 || branch1.trnf._rotation < 1.75) step = -step;
 branch1.trnf.rotate(step);
 branch2.trnf.rotate(step/2);

}

let nextFrame = () => {
  updateElement();
  ci.update();
  f += 1;
  let mouseOn = trunk.intersects(new oci.geo.Vector(mouse.x, mouse.y));
  $.get('#Output').prop({innerText: mouseOn? 'YES' : 'NO'})
    ._s.style({left: `${mouse.x}px`, top: `${mouse.y+30}px`});
  requestAnimationFrame(nextFrame);
}

canvas.on('mousemove', (evt) => {
  mouse.x = evt.clientX;
  mouse.y = evt.clientY;
});

requestAnimationFrame(nextFrame);
