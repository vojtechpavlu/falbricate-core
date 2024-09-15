import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/bundle.esm.mjs',
      format: 'esm',
      sourcemap: true,
    },
    {
      file: 'dist/bundle.cjs.cjs',
      format: 'cjs',
      sourcemap: true,
    },
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript({
      declaration: true,
      declarationDir: 'dist',
      rootDir: 'src',
    }),
  ],
};
