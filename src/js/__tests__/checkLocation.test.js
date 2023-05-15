import checkLocation from '../checkLocation';

describe('correct coordinates', () => {
  test('1', () => {
    expect(checkLocation('51.50851, -0.12572')).toEqual(true);
  });
  test('2', () => {
    expect(checkLocation('51.50851,-0.12572')).toEqual(true);
  });
  test('3', () => {
    expect(checkLocation('[51.50851,-0.12572]')).toEqual(true);
  });
});

describe('wrong coordinates', () => {
  test('1', () => {
    expect(checkLocation('51, 5')).toEqual(false);
  });
  test('2', () => {
    expect(checkLocation('qwerty')).toEqual(false);
  });
  test('3', () => {
    expect(checkLocation('51.50851,-0.12572, 5.4759')).toEqual(false);
  });
});
