import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import istanbul from 'rollup-plugin-istanbul';

const pkg = require('./package.json');
const {name} = pkg;

export default {
  input: 'src/index.js',
  output: [
    {file: pkg.module, 'format': 'en'},
    {file: pkg.main, 'format': 'umd', name}
  ],
  plugins: [
    svelte(),
    resolve(),
    istanbul({
      include: ['src/**'],
      exclude: ['**/*spec.js'],
    }),
    commonjs()
  ]
};
