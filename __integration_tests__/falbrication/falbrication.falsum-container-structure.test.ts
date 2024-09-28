import { FalsumContainer, getDefaultEcosystem, SchemaInput } from '../../src';

const ecosystem = getDefaultEcosystem();
const schema: SchemaInput = {
  profiles: {
    profileTest: '!const-profile',
  },
  fields: {
    field: '!const-test',
  },
};

const falbricate = ecosystem.compile(schema);
const falsumContainer: FalsumContainer = falbricate.generate({
  contextTest: '123!',
});

describe('Falsum Container structure', () => {
  it('should contain the expected context', () => {
    const context = falsumContainer.context;

    expect(context.index).toBe(0);
    expect(context.clientContext.contextTest).toBe('123!');
    expect(context.profiles.profileTest).toBe('profile');
  });

  it('should contain the exact schema given', () => {
    expect(JSON.stringify(falsumContainer.schema)).toBe(JSON.stringify(schema));
  });

  it('should contain the expected original object', () => {
    const original = falsumContainer.original;
    expect(original.field).toBe('test');
  });
});
