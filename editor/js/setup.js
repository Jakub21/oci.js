import * as oci from '../../oci.js';

export let getVectorStr = (v) => {
  return `(${v.x}, ${v.y})`;
}
export let getRotStr = (r) => {
  return `${Math.round(r*1e4)/1e4} rad`;
}
export let getScaleStr = (f) => {
  return `x${Math.round(f*1e4)/1e4}`;
}

export let getCenterVector = (editor) => {
  let canvas = editor.canvas;
  return new oci.geo.Vector(
    canvas.clientWidth/2-(canvas.clientWidth/2)%editor.steps.movement,
    canvas.clientHeight/2-(canvas.clientHeight/2)%editor.steps.movement);
}

export let setupImport = (editor) => {
  let input = $.get('#ProjectImport');
  input.prop({accept: '.json'}).on('input', (evt) => {
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      editor.importData(JSON.parse(event.target.result).data);
    });
    reader.readAsText(evt.target.files[0]);
    input.elm.nextSibling.innerText = evt.target.files[0].name;
  })
}

export let setupExport = (editor) => {
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

export let setupEditorValues = (editor) => {
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
    editor.steps.rotation += Math.PI/48;
    updateEditorValues(editor);
  });
  $.get('#BtnEditorStepRotDec').on('click', () => {
    editor.steps.rotation -= Math.PI/48;
    updateEditorValues(editor);
  });
  $.get('#BtnAnimInstantSnap').on('change', (evt) => {
    editor.settings.instantSnap = evt.target.checked;
    updateEditorValues(editor);
  });
  updateEditorValues(editor);
}

export let updateEditorValues = (editor) => {
  $.get('#ValEditorStepMove').prop({innerText: editor.steps.movement});
  $.get('#ValEditorStepScale').prop({innerText: getScaleStr(editor.steps.scale)});
  $.get('#ValEditorStepRotate').prop({innerText: getRotStr(editor.steps.rotation)});
  $.get('#BtnAnimInstantSnap').prop({checked:editor.settings.instantSnap});
}

export let setupComplexEditor = (editor) => {
  let cpxInput = $.get('#NameNewComplex');
  $.get('#BtnNewComplex').on('click', () => {
    let name = cpxInput.elm.value;
    if (name in Object.keys(editor.named)) {
      alert('Object name already taken');
      return;
    }
    if (name == '') {
      alert('Object needs to have a name');
      return;
    }
    let complex = new oci.elm.complex.Complex(editor);
    complex.trnf.move(getCenterVector(editor));
    editor.assignNamed(name, complex);
    $.get('#ComplexSelect').append($.make('option').prop({innerText:name})).prop({value:name}).elm.dispatchEvent(new Event('change'));
    // create a root
    createNewLimb(editor, '', '');
    $.get('#AttachmentSelect').prop({value:'ROOT'}).elm.dispatchEvent(new Event('change'));
  });

  $.get('#ComplexSelect').on('change', (evt) => {
    let name = $.get('#ComplexSelect').elm.value;
    let complex = editor.named[name];
    if (complex == undefined) {
      alert('Complex selection error');
      return;
    }
    editor.selected.cpx = complex;
    updateComplexValues(editor);
    updateLimbSelector(editor);
  });

  $.get('#BtnCpxAnchorCenter').on('click', () => {
    editor.selected.cpx.trf.setPosition(getCenterVector(editor));
    updateComplexValues(editor);
  });
  $.get('#BtnCpxAnchorYDec').on('click', () => {
    editor.selected.cpx.trf.move(oci.geo.Vector.UnitY().mult(-editor.steps.movement));
    updateComplexValues(editor);
  });
  $.get('#BtnCpxAnchorYInc').on('click', () => {
    editor.selected.cpx.trf.move(oci.geo.Vector.UnitY().mult(editor.steps.movement));
    updateComplexValues(editor);
  });
  $.get('#BtnCpxAnchorXDec').on('click', () => {
    editor.selected.cpx.trf.move(oci.geo.Vector.UnitX().mult(-editor.steps.movement));
    updateComplexValues(editor);
  });
  $.get('#BtnCpxAnchorXInc').on('click', () => {
    editor.selected.cpx.trf.move(oci.geo.Vector.UnitX().mult(editor.steps.movement));
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

export let updateComplexValues = (editor) => {
  let complex = editor.selected.cpx;
  $.get('#ValCpxAnchor').prop({innerText: getVectorStr(complex.trf._anchor)});
  $.get('#ValCpxRotation').prop({innerText: getRotStr(complex.trf._rotation)});
  $.get('#ValCpxScale').prop({innerText: getScaleStr(complex.trf._scale)});
}

export let updateLimbSelector = (editor) => {
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

export let updateLimbValues = (editor) => {
  let limb = editor.selected.limb;
  $.get('#ValLimbScale').prop({innerText: getScaleStr(limb.trf._scale)});
  if (limb == editor.selected.cpx._root) return;
  // joint
  let joint = editor.selected.joint;
  $.get('#ValJointAnchor').prop({innerText: getVectorStr(joint.target._anchor)});
  $.get('#ValJointOffset').prop({innerText: getVectorStr(joint.target._offset)});
  $.get('#ValJointRotation').prop({innerText: getRotStr(joint.target._rotation)});
}

export let createNewLimb = (editor, limbName, parent) => {
  let complex = editor.selected.cpx;
  if (complex == undefined) {
    alert('Invalid complex selected, cannot add a limb');
    return;
  }
  let handle = (limbName == '')? complex.root : complex.limb(limbName, parent);
  let prm = new oci.elm.poly.Rectangle(handle, 100, 100);
  new oci.tex.components.Outline(prm, new oci.tex.styles.Color(150, 255, 150, 100));
  new oci.tex.utility.JointAnchor(prm);
  if (limbName == '') limbName = 'ROOT';
  $.get('#LimbSelect').append($.make('option').prop({innerText: limbName
  })).prop({value:limbName}).elm.dispatchEvent(new Event('change'));
  $.get('#AttachmentSelect').append($.make('option').prop({innerText: limbName}));
}

export let setupLimbEditor = (editor) => {
  let limbInput = $.get('#NameNewLimb');
  $.get('#BtnNewLimb').on('click', () => {
    let limbName = limbInput.elm.value;
    let parent = $.get('#AttachmentSelect').elm.value;
    if (limbName == '') {
      alert('Limb needs to have a name');
      return;
    }
    createNewLimb(editor, limbName, parent);
  });

  $.get('#LimbSelect').on('change', (evt) => {
    let name = $.get('#LimbSelect').elm.value;
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
      let imf = new oci.tex.components.ImageFill(limb, event.target.result);
      new oci.tex.utility.JointAnchor(limb);
      new oci.tex.components.Outline(limb, new oci.tex.styles.Color(150, 255, 150, 100));
      imf.image.on('load', (evt) => {
        let size = new oci.geo.Vector(imf.image.elm.naturalWidth, imf.image.elm.naturalHeight);
        limb.vertices = [];
        limb.vertices.push(new oci.geo.Vector(size.x/2, size.y/2));
        limb.vertices.push(new oci.geo.Vector(-size.x/2, size.y/2));
        limb.vertices.push(new oci.geo.Vector(-size.x/2, -size.y/2));
        limb.vertices.push(new oci.geo.Vector(size.x/2, -size.y/2));
        limb.triangulate();
        limb.box = oci.geo.Box.FromVertices(limb.vertices);
        imf.transform(oci.geo.Matrix.Translation(new oci.geo.Vector(-size.x/2, -size.y/2)));
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
    editor.selected.joint.move(oci.geo.Vector.UnitY().mult(-editor.steps.movement));
    updateLimbValues(editor);
  });
  $.get('#BtnJointAnchorYInc').on('click', () => {
    editor.selected.joint.move(oci.geo.Vector.UnitY().mult(editor.steps.movement));
    updateLimbValues(editor);
  });
  $.get('#BtnJointAnchorXDec').on('click', () => {
    editor.selected.joint.move(oci.geo.Vector.UnitX().mult(-editor.steps.movement));
    updateLimbValues(editor);
  });
  $.get('#BtnJointAnchorXInc').on('click', () => {
    editor.selected.joint.move(oci.geo.Vector.UnitX().mult(editor.steps.movement));
    updateLimbValues(editor);
  });
  // JOINT OFFSET
  $.get('#BtnJointOffsetYDec').on('click', () => {
    editor.selected.joint.offset(oci.geo.Vector.UnitY().mult(-editor.steps.movement));
    updateLimbValues(editor);
  });
  $.get('#BtnJointOffsetYInc').on('click', () => {
    editor.selected.joint.offset(oci.geo.Vector.UnitY().mult(editor.steps.movement));
    updateLimbValues(editor);
  });
  $.get('#BtnJointOffsetXDec').on('click', () => {
    editor.selected.joint.offset(oci.geo.Vector.UnitX().mult(-editor.steps.movement));
    updateLimbValues(editor);
  });
  $.get('#BtnJointOffsetXInc').on('click', () => {
    editor.selected.joint.offset(oci.geo.Vector.UnitX().mult(editor.steps.movement));
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
