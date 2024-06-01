

export default class ValueHistory extends Array {
  constructor(maxLength) {
    this.maxLength = maxLength;
  }
  push(item) {
    super.push(item);
    if (this.length > this.maxLength) this.shift();
  }
}