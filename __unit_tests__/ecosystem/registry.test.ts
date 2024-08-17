import { Registry } from '../../src/ecosystem/registry';

type CustomItem = {
  value: string;
};

describe('Ecosystem Registry', () => {
  it('should consume the initial items', () => {
    const item: CustomItem = { value: 'test' };
    const registry = new Registry<CustomItem>('test-registry-type', {
      test: item,
    });

    expect(registry.has('test')).toBe(true);
  });

  it('should consume the registered item', () => {
    const registry = new Registry<CustomItem>('test-registry-type');

    const item: CustomItem = { value: 'test' };

    registry.register('test', item);

    expect(registry.has('test')).toBe(true);
  });

  it('should throw on already existing item', () => {
    const item1: CustomItem = { value: 'test' };

    const registry = new Registry<CustomItem>('test-registry-type', {
      test: item1,
    });

    const item2: CustomItem = { value: 'test2' };

    expect(() => registry.register('test', item2)).toThrow(
      `Can't register 'test' into test-registry-type registry - already exists`,
    );
  });

  it('should remove the registered item', () => {
    const item: CustomItem = { value: 'test' };
    const registry = new Registry<CustomItem>('test-registry-type', {
      test: item,
    });

    registry.remove('test');

    expect(registry.has('test')).toBe(false);
  });
});
