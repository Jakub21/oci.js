
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
