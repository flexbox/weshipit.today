/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { copyFileSync } from 'node:fs';
import * as path from 'path';

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/libs/utils',

  plugins: [
    react(),
    dts({
      entryRoot: 'src',
      tsConfigFilePath: path.join(import.meta.dirname, 'tsconfig.lib.json'),
      skipDiagnostics: true,
    }),
    {
      // Ship package.json with the bundle, as nxViteTsPaths did before Nx 24.
      name: 'copy-package-json',
      writeBundle(options) {
        copyFileSync(
          path.join(import.meta.dirname, 'package.json'),
          path.join(options.dir, 'package.json'),
        );
      },
    },
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    outDir: '../../dist/libs/utils',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/index.ts',
      name: 'utils',
      fileName: 'index',
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es', 'cjs'],
    },
    rolldownOptions: {
      // External packages that should not be bundled into your library.
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },
});
