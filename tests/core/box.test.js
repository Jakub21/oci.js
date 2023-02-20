import {default as Box} from '../../source/core/Box.js'

describe('core.box', () => {
  test('constructor', () => {
    let box = new Box(1, 2, 3, 4);
    expect(box.xmin).toBe(1);
  });
});
