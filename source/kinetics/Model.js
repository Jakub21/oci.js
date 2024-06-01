import Element from '../element/Element.js';

// Model is a representation of relations between elements connected with joints

export default class Model {
  constructor(parent, data={}) {
    this.tree = data.tree || {};
    this.states = data.states || {};
    this.elementData = data.elementData || {};
    this.elements = {};
    this._createElements(parent, this.elementData, this.tree);
  }
  state(name) {
    for (let [key, value] of Object.entries(this.states[name])) {
      this.elements[key].joint.set(value);
    }
  }
  _createElements(parent, data, nodeKeys) {
    for (let [key, children] of Object.entries(nodeKeys)) {
      this.elements[key] = new Element(parent, data[key]);
      if (children)
        this._createElements(this.elements[key], data, children);
    }
  }
}
