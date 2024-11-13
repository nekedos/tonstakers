import react from '@vitejs/plugin-react-swc';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    base: '/tonstakers/',
    plugins: [
      typescriptPaths({
        preserveExtensions: true,
        tsConfigPath: './tsconfig.json',
      }),
      react(),
    ],
  };
});
