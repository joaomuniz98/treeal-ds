import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],

  build: {
    // ── Library mode ──────────────────────────────────────────────────────
    lib: {
      entry:    resolve(__dirname, 'components/index.ts'),
      name:     'TreealDS',
      formats:  ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'esm' : 'cjs'}.js`,
    },

    // ── Externalize peer deps (not bundled) ───────────────────────────────
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        // Preserve module structure for tree-shaking in ESM
        preserveModules: true,
        preserveModulesRoot: '.',
        // Global var names (only used in UMD/IIFE, not es/cjs)
        globals: {
          react:              'React',
          'react-dom':        'ReactDOM',
          'react/jsx-runtime':'jsxRuntime',
        },
        // Put CSS assets in dist/assets/
        assetFileNames: 'assets/[name][extname]',
      },
    },

    // ── Output dir ────────────────────────────────────────────────────────
    outDir:        'dist',
    emptyOutDir:   true,

    // ── Sourcemaps for easier debugging in consumers ──────────────────────
    sourcemap: true,

    // ── CSS: all module styles go into a single dist/style.css ───────────
    cssCodeSplit: false,
  },
});
