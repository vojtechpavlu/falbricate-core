import { Registry } from '../../src/ecosystem/registry';

type CustomItem = {
  value: string;
};

describe('Ecosystem Registry - Initialization', () => {
  it('should consume the initial items', () => {
    const item: CustomItem = { value: 'test' };
    const registry = new Registry<CustomItem>('test-registry-type', {
      test: item,
    });

    expect(registry.has('test')).toBe(true);
  });

  it('should pass on not giving the initial items', () => {
    expect(() => new Registry<CustomItem>('test-registry-type')).not.toThrow();
  });

  it('should throw when not giving a non-empty registry type', () => {
    expect(() => new Registry<CustomItem>('')).toThrow(
      'Registry type must be a non-empty string',
    );
  });
});

describe('Ecosystem Registry - Registering items', () => {
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

  it(`should throw on empty item's name`, () => {
    const registry = new Registry<CustomItem>('test-registry-type');

    const item: CustomItem = { value: 'test' };

    expect(() => registry.register('', item)).toThrow(
      `Item's name for test-registry-type must be a non-empty string ('')`,
    );
  });

  it(`should throw on empty item`, () => {
    const registry = new Registry<CustomItem>('test-registry-type');

    // @ts-expect-error should never occur
    // eslint-disable-next-line unicorn/no-useless-undefined
    expect(() => registry.register('test', undefined)).toThrow(
      `Given item for test-registry-type must not be empty value`,
    );
  });
});

describe('Ecosystem Registry - Removing items', () => {
  it('should remove the registered item', () => {
    const item: CustomItem = { value: 'test' };
    const registry = new Registry<CustomItem>('test-registry-type', {
      test: item,
    });

    registry.remove('test');

    expect(registry.has('test')).toBe(false);
  });

  it('should not fail on removing non-existing item', () => {
    const registry = new Registry<CustomItem>('test-registry-type');

    expect(() => registry.remove('test')).not.toThrow();
  });
});

describe('Ecosystem Registry - Retrieving items', () => {
  it('should successfully retrieve a registered item', () => {
    const item: CustomItem = { value: 'success' };
    const registry = new Registry<CustomItem>('test-registry-type', {
      test: item,
    });

    const retrieved = registry.get('test');

    expect(retrieved.value).toBe('success');
  });

  it('should throw on retrieving an item not registered', () => {
    const registry = new Registry<CustomItem>('test-registry-type');

    expect(() => registry.get('non-existing')).toThrow(
      `No item 'non-existing' found in registry test-registry-type`,
    );
  });
});
