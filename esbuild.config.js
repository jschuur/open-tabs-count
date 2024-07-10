const esbuild = require('esbuild');

esbuild
  .build({
    entryPoints: ['src/background.ts', 'src/popup.ts'],
    bundle: true,
    outdir: 'dist',
    platform: 'browser',
    target: ['chrome58'],
    format: 'esm',
    define: {
      'process.env.NODE_ENV': '"production"',
      'process.env.TINYBIRD_TOKEN': `"${process.env.TINYBIRD_TOKEN}"`,
      'process.env.TINYBIRD_BASE_URL': `"${process.env.TINYBIRD_BASE_URL}"`,
    },
    alias: {
      '@': './src',
    },
  })
  .catch(() => process.exit(1));
