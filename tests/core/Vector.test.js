import {default as Vector} from '../../source/core/Vector.js'

describe('core.Vector', () => {
  test('class exists', () => {
    expect(Vector.constructor).toBeDefined();
  });
  test('some failure', () => {
    throw 'asdasd';
  })
});
