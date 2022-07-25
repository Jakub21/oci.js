
let getVectorStr = (v) => {
  return `(${v.x}, ${v.y})`;
}
let getRotStr = (r) => {
  return `${Math.round(r*1e4)/1e4} rad`;
}
let getScaleStr = (f) => {
  return `x${Math.round(f*1e4)/1e4}`;
}

let setupImport = (editor) => {
  let input = $.get('#ProjectImport');
  input.prop({accept: '.json'}).on('input', (evt) => {
    console.log('change', evt);
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      console.log(JSON.parse(event.target.result).data);
      editor.importData(JSON.parse(event.target.result).data);
    });
    reader.readAsText(evt.target.files[0]);
    input.elm.nextSibling.innerText = evt.target.files[0].name;
  })
}

let setupExport = (editor) => {
  let button = $.get('#BtnExport');
  button.on('click', () => {
    $.get('body').appendShp(`
      $div[#Download] {
        $div[.Background]
        $div[.Content] {
        $a[.Button .Proceed href 'data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(editor.generateData()))}'
          download 'project.json'] {Download}
        $button[.Cancel] {Cancel}}
      }
    `);
    let cancel = () => {
      $.get('#Download').remove();
    }
    $.get('.Proceed', $.get('#Download').elm).on('click', ()=>{cancel()});
    $.get('.Cancel', $.get('#Download').elm).onk('click', KEYBOARD, 'Escape', ()=>{cancel()});
  });
}

let setupEditorValues = (editor) => {
  $.get('#BtnEditorStepMoveInc').on('click', () => {
    editor.steps.movement += 1;
    updateEditorValues(editor);
  });
  $.get('#BtnEditorStepMoveDec').on('click', () => {
    editor.steps.movement -= 1;
    updateEditorValues(editor);
  });
  $.get('#BtnEditorStepScaleInc').on('click', () => {
    editor.steps.scale += .01;
    updateEditorValues(editor);
  });
  $.get('#BtnEditorStepScaleDec').on('click', () => {
    editor.steps.scale -= .01;
    updateEditorValues(editor);
  });
  $.get('#BtnEditorStepRotInc').on('click', () => {
    editor.steps.rotation += Math.PI/50;
    updateEditorValues(editor);
  });
  $.get('#BtnEditorStepRotDec').on('click', () => {
    editor.steps.rotation -= Math.PI/50;
    updateEditorValues(editor);
  });
  updateEditorValues(editor);
}

let updateEditorValues = (editor) => {
  $.get('#ValEditorStepMove').prop({innerText: editor.steps.movement});
  $.get('#ValEditorStepScale').prop({innerText: getScaleStr(editor.steps.scale)});
  $.get('#ValEditorStepRotate').prop({innerText: getRotStr(editor.steps.rotation)});
}

let setupComplexEditor = (editor) => {
  let cpxInput = $.get('#NameNewComplex');
  cpxInput.on('keydown', (evt) => {
    if (evt.key != 'Enter') return;
    let name = cpxInput.elm.value;
    if (name in Object.keys(editor.named)) {
      alert('Complex name already taken');
      return;
    }
    let complex = new oci.cpx.Complex(editor);
    let canvas = editor.canvas;
    complex.trf.move(new oci.Vector(canvas.clientWidth/2, canvas.clientHeight/2));
    editor.assignNamed(name, complex);
    $.get('#ComplexSelect').append($.make('option').prop({innerText:name})).prop({value:name}).elm.dispatchEvent(new Event('change'));
  });

  $.get('#ComplexSelect').on('change', (evt) => {
    let name = $.get('#ComplexSelect').elm.value;
    console.log('Editing', name);
    console.log(editor.named);
    let complex = editor.named[name];
    if (complex == undefined) {
      alert('Complex selection error');
      return;
    }
    editor.selected.cpx = complex;
    updateComplexValues(editor);
    updateLimbSelector(editor);
  });

  $.get('#BtnCpxAnchorYDec').on('click', () => {
    editor.selected.cpx.trf.move(oci.Vector.UnitY().mult(-editor.steps.movement));
    updateComplexValues(editor);
  });
  $.get('#BtnCpxAnchorYInc').on('click', () => {
    editor.selected.cpx.trf.move(oci.Vector.UnitY().mult(editor.steps.movement));
    updateComplexValues(editor);
  });
  $.get('#BtnCpxAnchorXDec').on('click', () => {
    editor.selected.cpx.trf.move(oci.Vector.UnitX().mult(-editor.steps.movement));
    updateComplexValues(editor);
  });
  $.get('#BtnCpxAnchorXInc').on('click', () => {
    editor.selected.cpx.trf.move(oci.Vector.UnitX().mult(editor.steps.movement));
    updateComplexValues(editor);
  });
  $.get('#BtnCpxRotDec').on('click', () => {
    editor.selected.cpx.trf.rotate(editor.steps.rotation);
    updateComplexValues(editor);
  });
  $.get('#BtnCpxRotInc').on('click', () => {
    editor.selected.cpx.trf.rotate(-editor.steps.rotation);
    updateComplexValues(editor);
  });
  $.get('#BtnCpxScaleDec').on('click', () => {
    editor.selected.cpx.trf.scaleAdd(-editor.steps.scale);
    updateComplexValues(editor);
  });
  $.get('#BtnCpxScaleInc').on('click', () => {
    editor.selected.cpx.trf.scaleAdd(editor.steps.scale);
    updateComplexValues(editor);
  });
}

let updateComplexValues = (editor) => {
  let complex = editor.selected.cpx;
  $.get('#ValCpxAnchor').prop({innerText: getVectorStr(complex.trf._anchor)});
  $.get('#ValCpxRotation').prop({innerText: getRotStr(complex.trf._rotation)});
  $.get('#ValCpxScale').prop({innerText: getScaleStr(complex.trf._scale)});
}

let updateLimbSelector = (editor) => {
  console.log('updateLimbSelector', editor.selected.cpx);
  $.get('#AttachmentSelect').empty();
  $.get('#LimbSelect').empty();
  let complex = editor.selected.cpx;
  if (complex != undefined) {
    if (complex._root != undefined) {
      let limbName = 'ROOT';
      $.get('#AttachmentSelect').append($.make('option').prop({innerText: limbName}));
      $.get('#LimbSelect').append($.make('option').prop({innerText: limbName}));
    }
    for (let [limbName, limb] of Object.entries(complex.limbs)) {
      $.get('#AttachmentSelect').append($.make('option').prop({innerText: limbName}));
      $.get('#LimbSelect').append($.make('option').prop({innerText: limbName}));
    }
  }
}

let updateLimbValues = (editor) => {
  let limb = editor.selected.limb;
  $.get('#ValLimbScale').prop({innerText: getScaleStr(limb.trf._scale)});
  if (limb == editor.selected.cpx._root) return;
  // joint
  let joint = editor.selected.joint;
  $.get('#ValJointAnchor').prop({innerText: getVectorStr(joint.target._anchor)});
  $.get('#ValJointOffset').prop({innerText: getVectorStr(joint.target._offset)});
  $.get('#ValJointRotation').prop({innerText: getRotStr(joint.target._rotation)});
}

let setupLimbEditor = (c) => {
  let limbInput = $.get('#NameNewLimb');
  limbInput.on('keydown', (evt) => {
    if (evt.key != 'Enter') return;
    console.log('enter new limb');
    let complex = editor.selected.cpx;
    if (complex == undefined) {
      alert('Invalid complex selected, cannot add a limb');
      return;
    }
    let limbName = limbInput.elm.value;
    let prm;
    if (limbName == '') {
      prm = new oci.prm.Rectangle(complex.root, 100, 100);
      limbName = 'ROOT';
    } else {
      if (complex._root == undefined) {
        alert('Can not add a named limb to a complex that has no root yet');
        return;
      }
      let parent = $.get('#AttachmentSelect').elm.value;
      prm = new oci.prm.Rectangle(complex.limb(limbName, parent), 100, 100);
    }
    new oci.tex.Outline(prm, new oci.tex.Color(150, 255, 150, 100));
    new oci.tex.JointAnchor(prm);
    $.get('#LimbSelect').append($.make('option').prop({innerText: limbName
    })).prop({value:limbName}).elm.dispatchEvent(new Event('change'));
    $.get('#AttachmentSelect').append($.make('option').prop({innerText: limbName}));
    if (limbName == 'ROOT')
      $.get('#AttachmentSelect').prop({value:limbName}).elm.dispatchEvent(new Event('change'));
  });

  $.get('#LimbSelect').on('change', (evt) => {
    let name = $.get('#LimbSelect').elm.value;
    console.log('Editing limb', name);
    let complex = editor.selected.cpx;
    if (complex == undefined) {
      alert('Limb selection error: Select valid complex first');
      return;
    }
    let limb = (name=='ROOT')? complex._root : complex.limbs[name];
    if (limb == undefined) {
      alert('Limb selection error');
      return;
    }
    editor.selected.limb = limb;
    editor.selected.joint = complex.getJoint(name);
    updateLimbValues(editor);
  });

  let input = $.get('#ImageImport');
  input.prop({accept: 'image/'}).on('input', (evt) => {
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      let limb = editor.selected.limb;
      limb.tex.reset();
      let imf = new oci.tex.ImageFill(limb, event.target.result);
      new oci.tex.JointAnchor(limb);
      new oci.tex.Outline(limb, new oci.tex.Color(150, 255, 150, 100));
      imf.image.on('load', (evt) => {
        let size = new oci.Vector(imf.image.elm.naturalWidth, imf.image.elm.naturalHeight);
        console.log('size', size);
        limb.vertices = [];
        limb.vertices.push(new oci.Vector(size.x/2, size.y/2));
        limb.vertices.push(new oci.Vector(-size.x/2, size.y/2));
        limb.vertices.push(new oci.Vector(-size.x/2, -size.y/2));
        limb.vertices.push(new oci.Vector(size.x/2, -size.y/2));
        limb.triangulate();
        limb.box = oci.Box.FromVertices(limb.vertices);
        imf.transform(oci.Matrix.Translation(new oci.Vector(-size.x/2, -size.y/2)));
      });
    });
    reader.readAsDataURL(evt.target.files[0]);
    input.elm.nextSibling.innerText = evt.target.files[0].name;
  })

  $.get('#BtnLimbScaleDec').on('click', () => {
    editor.selected.limb.trf.scaleAdd(editor.steps.scale);
    updateLimbValues(editor);
  });
  $.get('#BtnLimbScaleInc').on('click', () => {
    editor.selected.limb.trf.scaleAdd(-editor.steps.scale);
    updateLimbValues(editor);
  });
  // JOINT ANCHOR
  $.get('#BtnJointAnchorYDec').on('click', () => {
    editor.selected.joint.move(oci.Vector.UnitY().mult(-editor.steps.movement));
    updateLimbValues(editor);
  });
  $.get('#BtnJointAnchorYInc').on('click', () => {
    editor.selected.joint.move(oci.Vector.UnitY().mult(editor.steps.movement));
    updateLimbValues(editor);
  });
  $.get('#BtnJointAnchorXDec').on('click', () => {
    editor.selected.joint.move(oci.Vector.UnitX().mult(-editor.steps.movement));
    updateLimbValues(editor);
  });
  $.get('#BtnJointAnchorXInc').on('click', () => {
    editor.selected.joint.move(oci.Vector.UnitX().mult(editor.steps.movement));
    updateLimbValues(editor);
  });
  // JOINT OFFSET
  $.get('#BtnJointOffsetYDec').on('click', () => {
    editor.selected.joint.offset(oci.Vector.UnitY().mult(-editor.steps.movement));
    updateLimbValues(editor);
  });
  $.get('#BtnJointOffsetYInc').on('click', () => {
    editor.selected.joint.offset(oci.Vector.UnitY().mult(editor.steps.movement));
    updateLimbValues(editor);
  });
  $.get('#BtnJointOffsetXDec').on('click', () => {
    editor.selected.joint.offset(oci.Vector.UnitX().mult(-editor.steps.movement));
    updateLimbValues(editor);
  });
  $.get('#BtnJointOffsetXInc').on('click', () => {
    editor.selected.joint.offset(oci.Vector.UnitX().mult(editor.steps.movement));
    updateLimbValues(editor);
  });
  // JOINT ROTATION
  $.get('#BtnJointRotationDec').on('click', () => {
    editor.selected.joint.rotate(editor.steps.rotation);
    updateLimbValues(editor);
  });
  $.get('#BtnJointRotationInc').on('click', () => {
    editor.selected.joint.rotate(-editor.steps.rotation);
    updateLimbValues(editor);
  });
}
