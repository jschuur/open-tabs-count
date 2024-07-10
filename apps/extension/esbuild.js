require('dotenv-mono').load();
const pc = require('picocolors');

const { parse } = require('path');

const esbuild = require('esbuild');
const glob = require('glob');

// see also https://github.com/mattburrell/simple-chrome-extension-esbuild

const watchMode = Boolean(process.argv.includes('--watch'));

const publicDir = 'public';
const distDir = 'dist';

const publicFiles = glob.sync('public/**/*.{html,json}', { nodir: true });
const mappedPublicFiles = new Map(publicFiles.map((path) => [parse(path).name, path]));

const srcEntryPoints = ['src/popup.ts', 'src/background.ts'];
const mappedSrcFiles = new Map(srcEntryPoints.map((path) => ['src/' + parse(path).name, path]));

const entryPoints = {
  ...Object.fromEntries(mappedSrcFiles),
  ...Object.fromEntries(mappedPublicFiles),
};

const buildOptions = {
  entryPoints,
  bundle: true,
  outdir: distDir,
  platform: 'browser',
  target: ['chrome58'],
  format: 'esm',
  sourcemap: process.env.NODE_ENV !== 'production',
  define: {
    'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
    'process.env.TINYBIRD_TOKEN': `"${process.env.TINYBIRD_TOKEN}"`,
    'process.env.TINYBIRD_BASE_URL': `"${process.env.TINYBIRD_BASE_URL}"`,
  },
  alias: {
    '@': './src',
  },
  loader: {
    '.html': 'copy',
    '.css': 'copy',
    '.png': 'copy',
    '.svg': 'copy',
    '.json': 'copy',
  },
};

// via https://github.com/evanw/esbuild/releases/tag/v0.17.0
const plugins = [
  {
    name: 'rebuild-plugin',
    setup(build) {
      let count = 0;

      build.onEnd(async (result) => {
        count++;

        if (watchMode) console.log(`Build updated (#${count})`);
        else console.log('Build completed.');

        if (result.errors.length > 0) {
          console.error(pc.red(`Build error:\n${JSON.stringify(result.errors, null, 2)}`));

          return;
        }
      });
    },
  },
];

(async () => {
  if (!process.env.TINYBIRD_TOKEN) {
    console.error(pc.red('TINYBIRD_TOKEN is required (maybe TINYBIRD_BASE_URL too)'));

    process.exit(1);
  }

  if (!process.env.TINYBIRD_BASE_URL) {
    console.warn(pc.yellow('Defaulting TINYBIRD_BASE_URL to https://api.tinybird.co/'));
  }

  try {
    if (watchMode) {
      const context = await esbuild.context({ ...buildOptions, plugins });

      await context.watch();
      await context.rebuild();
    } else await esbuild.build({ ...buildOptions, plugins });
  } catch (err) {
    console.error(pc.red(`Build error:\n${JSON.stringify(err, null, 2)}`));

    process.exit(1);
  }
})();
