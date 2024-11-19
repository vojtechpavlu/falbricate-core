import { Ecosystem } from '@falbricate/fw';
import { CorePlugin, getDefaultEcosystem } from '../src';

describe('Core plugin import', () => {
  it('should not fail when trying to import directly to constructor', () => {
    expect(() => new Ecosystem(CorePlugin)).not.toThrow();
  });

  it('should not fail when trying to import ex-post', () => {
    const ecosystem = new Ecosystem();
    expect(() => ecosystem.register(CorePlugin)).not.toThrow();
  });

  it('should not fail when providing a core-plugin through factory fun', () => {
    expect(() => getDefaultEcosystem()).not.toThrow();
  });
});
