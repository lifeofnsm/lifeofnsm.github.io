// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.natarajmalavade.in',
  // Output `tools.html`, `contact.html` … instead of `tools/index.html`,
  // so every URL that is already indexed by Google keeps working.
  build: { format: 'file' },
  trailingSlash: 'never',
});
