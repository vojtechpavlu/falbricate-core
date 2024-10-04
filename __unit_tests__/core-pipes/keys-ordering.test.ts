import { orderKeysPipe } from '../../src';

describe('Object keys ordering', () => {
  describe('configuration', () => {
    it('should throw on unexpected order type', () => {
      expect(() => orderKeysPipe({ order: 'unrecognized' })).toThrow(
        `Can't order object keys - unexpected ordering: 'unrecognized', ` +
        `allowed options: asc,desc`
      );
    });
  });

  describe('piping', () => {
    it('should order the keys in ascending order', () => {
      const testObject = { x: 3, a: 1, f: 2 };
      const pipe = orderKeysPipe({ order: 'asc' });
      const ordered = pipe(testObject) as { [n: string]: number };

      expect(Object.keys(ordered)).toEqual(['a', 'f', 'x']);
    });

    it('should order the keys in descending order', () => {
      const testObject = { x: 3, a: 1, f: 2 };
      const pipe = orderKeysPipe({ order: 'desc' });
      const ordered = pipe(testObject) as { [n: string]: number };

      expect(Object.keys(ordered)).toEqual(['x', 'f', 'a']);
    });

    it('should throw on not object', () => {
      const testObject = "not-object";
      const pipe = orderKeysPipe({ order: 'asc' });

      expect(() => pipe(testObject)).toThrow(
        `Can't order object keys - plain object (not array) is expected`
      );
    });

    it('should throw on array', () => {
      const testObject = [] as unknown[];
      const pipe = orderKeysPipe({ order: 'asc' });

      expect(() => pipe(testObject)).toThrow(
        `Can't order object keys - plain object (not array) is expected`
      );
    });
  });
});
