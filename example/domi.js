(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const DomiObject = require('./dobject/DomiObject');

module.exports = class Keyboard {
  constructor(dobj) {
    this.dobj = dobj || new DomiObject(document);
  }
  bind(keys, callback) {
    if (keys.constructor != Array) keys = [keys];
    this.dobj.on('keydown', (evt) => {
      if (keys.includes(evt.key)) callback(evt);
    });
    return this;
  }
  bindIns(keys, callback) {
    if (keys.constructor != Array) keys = [keys];
    for (let key of keys) {
      let keyU = key.toUpperCase();
      if (keyU != key) keys.push(keyU);
      let keyL = key.toLowerCase();
      if (keyL != key) keys.push(keyL);
    }
    this.bind(keys, callback);
    return this;
  }
}

},{"./dobject/DomiObject":2}],2:[function(require,module,exports){
const ObjectShpInsert = require('./ObjectShpInsert');
const StyleManager = require('./StyleManager');

module.exports = class DomiObject extends ObjectShpInsert {
  constructor(elm) {
    super();
    this.elm = elm
    this._s = new StyleManager(elm);
  }
  prop(config={}) {
    for (let [key, val] of Object.entries(config)) {
      this.elm[key] = val;
    }
    return this;
  }
  remove() {
    this.elm.parentNode.removeChild(this.elm);
    return this;
  }
  empty() {
    if (this.elm.lastChild === undefined) return;
    while (this.elm.lastChild) { this.elm.removeChild(this.elm.lastChild); }
    return this.elm;
  }
}

},{"./ObjectShpInsert":5,"./StyleManager":6}],3:[function(require,module,exports){

module.exports = class ObjectHandles {
  on(evtKey, cb, ...opts) {
    if (evtKey.constructor == Array) {
      for (let k of evtKey) this.elm.addEventListener(k, cb, ...opts);
    } else {
      this.elm.addEventListener(evtKey, cb, ...opts);
    }
    return this;
  }
  onk(evtKey, kb, kbKey, cb, ...opts) {
    this.on(evtKey, cb, ...opts);
    kb.bind(kbKey, cb);
    return this;
  }
  onkIns(evtKey, kb, kbKey, cb, ...opts) {
    this.on(evtKey, cb, ...opts);
    kb.bindIns(kbKey, cb);
    return this;
  }
}

},{}],4:[function(require,module,exports){
const ObjectHandles = require('./ObjectHandles');

module.exports = class ObjectInsert extends ObjectHandles {
  append(...others) {
    for (let other of others)
      this.elm.append(other.elm);
    return this;
  }
  prepend(...others) {
    for (let other of others)
      this.elm.prepend(other.elm);
    return this;
  }
  before(...others) {
    for (let other of others)
      this.elm.parentNode.insertBefore(other.elm, this.elm);
    return this;
  }
  after(...others) {
    for (let other of others)
      this.elm.parentNode.insertBefore(other.elm, this.elm.nextSibling);
    return this;
  }
}

},{"./ObjectHandles":3}],5:[function(require,module,exports){
const ObjectInsert = require('./ObjectInsert');

module.exports = class ObjectShpInsert extends ObjectInsert {
  constructor() {
    super();
    try {this.compiler = new shp.Compiler()}
    catch(err) {}
  }

  appendShp(shp) {
    const _class = this.constructor;
    for (let node of this._buildShp(shp)) this.append(new _class(node));
    return this;
  }
  prependShp(shp) {
    const _class = this.constructor;
    for (let node of this._buildShp(shp)) this.prepend(new _class(node));
    return this;
  }
  beforeShp(shp) {
    const _class = this.constructor;
    for (let node of this._buildShp(shp)) this.before(new _class(node));
    return this;
  }
  afterShp(shp) {
    const _class = this.constructor;
    for (let node of this._buildShp(shp)) this.after(new _class(node));
    return this;
  }
  _buildShp(shp) {
    if (this.compiler == undefined) {
      console.error('SHP is not available');
      return;
    }
    this.compiler.reset();
    return this.compiler.compile(shp);
  }
}

},{"./ObjectInsert":4}],6:[function(require,module,exports){
const ObjectHandles = require('./ObjectHandles');

module.exports = class StyleManager {
  constructor(elm) {
    this.elm = elm;
  }
  set(prop, value) {
    this.elm.style[prop] = value;
    return this;
  }
  style(styles) {
    for (let [prop, value] of Object.entries(styles)) {
      this.set(prop, value);
    }
    return this;
  }
  add(cc) {
    this.elm.classList.add(cc);
    return this;
  }
  remove(cc) {
    this.elm.classList.remove(cc);
    return this;
  }
  toggle(cc) {
    this.elm.classList.toggle(cc);
    return this;
  }
  setAdded(cc, state) {
    if (state) this.elm.classList.add(cc);
    else this.elm.classList.remove(cc);
    return this;
  }
  choice(cc, allChoices) {
    for (let other of allChoices) {
      if (other == cc) this.add(other);
      else this.remove(other);
    }
    return this;
  }
  nextChoice(allChoices) {
    let current = Array.from(this.elm.classList);
    current = current.filter(c => {return allChoices.includes(c)});
    if (current.length) current = current[0];
    else current = allChoices[0];
    let next = allChoices.indexOf(current) + 1;
    if (next == allChoices.length) next = 0;
    next = allChoices[next];
    for (let other of allChoices) {
      if (other == next) this.add(other);
      else this.remove(other);
    }
    return this;
  }
}

},{"./ObjectHandles":3}],7:[function(require,module,exports){
const DomiObject = require('./DomiObject');
module.exports.DomiObject = DomiObject;

module.exports.make = (data) => {
  let words = data.split(' ');
  let elm = document.createElement(words[0]);
  for (let token of words.slice(1)) {
    let type = token.charAt(0);
    let name = token.slice(1);
    switch (type) {
      case '#':
        elm.id = name; break;
      case '.':
        elm.classList.add(name); break;
      case '!':
        elm[name] = true; break;
      default:
        throw 'Invalid token';
    }
  }
  return new DomiObject(elm);
}

module.exports.get = (selector, parent) => {
  parent = parent || document;
  return new DomiObject(parent.querySelector(selector));
}

module.exports.getArr = (selector, parent) => {
  parent = parent || document;
  let elms = Array.from(parent.querySelectorAll(selector));
  return elms.map(e => {return new DomiObject(e);});
}

},{"./DomiObject":2}],8:[function(require,module,exports){
const _Toggle = require('./_Toggle');

module.exports = class AnimHide extends _Toggle {
  constructor(elm, onClass, offClass, delay) {
    super(elm);
    this.state = !elm.hidden;
    this.onClass = onClass;
    this.offClass = offClass;
    this.delay = delay * 1e3;
  }
  on() {
    super.on();
    setTimeout(() => {
      this.elm._s.choice(this.onClass, [this.onClass, this.offClass]);
    }, this.delay);
    this.elm.prop({hidden:false});
    return this;
  }
  off() {
    super.off();
    this.elm._s.choice(this.offClass, [this.onClass, this.offClass]);
    setTimeout(() => { this.elm.prop({hidden:true}); }, this.delay);
    return this;
  }
}

},{"./_Toggle":13}],9:[function(require,module,exports){
const _Toggle = require('./_Toggle');

module.exports = class CssClass extends _Toggle {
  constructor(elm, onClass, offClass) {
    super(elm);
    this.onClass = onClass;
    this.offClass = offClass;
  }
  on() {
    super.on();
    this.elm._s.choice(this.onClass, [this.onClass, this.offClass]);
    return this;
  }
  off() {
    super.off();
    this.elm._s.choice(this.offClass, [this.onClass, this.offClass]);
    return this;
  }
}

},{"./_Toggle":13}],10:[function(require,module,exports){
const _Toggle = require('./_Toggle');

module.exports = class Group extends _Toggle {
  constructor(...toggles) {
    super();
    this.toggles = toggles;
  }
  add(toggle) {
    this.toggles.push(toggle);
    return this;
  }
  on() {
    super.on();
    for (let toggle of this.toggles) {
      toggle.on();
    }
    return this;
  }
  off() {
    super.off();
    for (let toggle of this.toggles) {
      toggle.off();
    }
    return this;
  }
}

},{"./_Toggle":13}],11:[function(require,module,exports){
const _Toggle = require('./_Toggle');

module.exports = class Hide extends _Toggle {
  constructor(elm) {
    super(elm);
    this.state = !elm.hidden;
  }
  on() {
    super.on();
    this.elm.prop({hidden:false});
    return this;
  }
  off() {
    super.off();
    this.elm.prop({hidden:true});
    return this;
  }
}

},{"./_Toggle":13}],12:[function(require,module,exports){
const Hide = require('./Hide');

module.exports = class SingleChoice {
  constructor(_ToggleClass, ...defaultOptions) {
    this.toggles = {};
    this.onDelay = 0;
    this.defaultOptions = defaultOptions;
    this.current = '';
    this._ToggleClass = _ToggleClass || Hide;
  }
  enableOnDelay(seconds) {
    this.onDelay = seconds;
    return this;
  }
  add(id, elm, ...options) {
    this.toggles[id] = new this._ToggleClass(elm,
      ...this.defaultOptions, ...options);
    return this;
  }
  addToggle(id, toggle) {
    this.toggles[id] = toggle;
    return this;
  }
  goto(id) {
    if (this.current == id) return;
    if (this.onDelay) this._goto_delay(id);
    else this._goto_instant(id);
    this.current = id;
    return this;
  }
  _goto_delay(id) {
    for (let [tid, toggle] of Object.entries(this.toggles)) {
      if (tid == id) setTimeout(()=>{toggle.on()}, this.onDelay * 1e3);
      else toggle.off();
    }
  }
  _goto_instant(id) {
    for (let [tid, toggle] of Object.entries(this.toggles)) {
      if (tid == id) toggle.on();
      else toggle.off();
    }
  }
}

},{"./Hide":11}],13:[function(require,module,exports){

module.exports = class _Toggle {
  constructor(elm) {
    this.elm = elm;
    this.state = true;
  }
  toggle() {
    if (this.state) this.off();
    else this.on();
    return this;
  }
  on() {
    this.state = true;
    return this;
  }
  off() {
    this.state = false;
    return this;
  }
}

},{}],14:[function(require,module,exports){
module.exports.Hide = require('./Hide');
module.exports.CssClass = require('./CssClass');
module.exports.AnimHide = require('./AnimHide');
module.exports.SingleChoice = require('./SingleChoice');
module.exports.Group = require('./Group');

},{"./AnimHide":8,"./CssClass":9,"./Group":10,"./Hide":11,"./SingleChoice":12}],15:[function(require,module,exports){
window.$ = require('./source/dobject');
window.$.Keyboard = require('./source/Keyboard');
window.$toggle = require('./source/toggles');

},{"./source/Keyboard":1,"./source/dobject":7,"./source/toggles":14}]},{},[15]);
