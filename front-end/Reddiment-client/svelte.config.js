import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const config = defineConfig({
  envPrefix: 'VITE_',
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
  },
});

export default config;