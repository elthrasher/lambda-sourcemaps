import { build, BuildOptions } from 'esbuild';

const buildOptions: BuildOptions = {
  bundle: true,
  entryPoints: {
    ['create/index']: `${__dirname}/../fns/create.ts`,
    ['delete/index']: `${__dirname}/../fns/delete.ts`,
    ['list/index']: `${__dirname}/../fns/list.ts`,
  },
  minify: true,
  outbase: 'fns',
  outdir: 'sam/build',
  platform: 'node',
  sourcemap: true,
};

build(buildOptions);
