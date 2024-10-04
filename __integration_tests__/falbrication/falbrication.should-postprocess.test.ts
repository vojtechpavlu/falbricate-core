import { getDefaultEcosystem, SchemaInput } from '../../src';

const schema: SchemaInput = {
  fields: {
    constant: '!const-test',
  },
  postprocess: {
    stringified: ['stringify'],
  },
};

const ecosystem = getDefaultEcosystem();
const falbricator = ecosystem.compile(schema);

describe('Falbrication postprocessing', () => {
  it('should contain the default', () => {
    const generated = falbricator.generate();
    expect(generated.original).toMatchObject({ constant: 'test' });
  });

  it('should contain the postprocessing branch', () => {
    const generated = falbricator.generate();
    expect(generated.postprocessed.stringified).toBe('{"constant":"test"}');
  });
});
