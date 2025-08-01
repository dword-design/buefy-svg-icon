import { expect, test } from '@playwright/test';
import packageName from 'depcheck-package-name';
import javascript from 'endent';
import { execaCommand } from 'execa';
import getPort from 'get-port';
import nuxtDevReady from 'nuxt-dev-ready';
import outputFiles from 'output-files';
import kill from 'tree-kill-promise';

test('works', async ({ page }, testInfo) => {
  const cwd = testInfo.outputPath();

  await outputFiles(cwd, {
    'nuxt.config.ts': javascript`
      import svgLoader from '${packageName`vite-svg-loader`}';

      export default defineNuxtConfig({
        vite: {
          plugins: [svgLoader()],
        },
      });
    `,
    'pages/index.vue': javascript`
      <template>
        <b-icon :icon="DragIcon" />
      </template>

      <script setup lang="ts">
      import DragIcon from '${packageName`@mdi/svg`}/svg/drag.svg';
      </script>
    `,
    'plugins/buefy.js': javascript`
      import Buefy from '${packageName`buefy`}';
      import Self from '../../src/index.vue';
      import 'buefy/dist/buefy.css';

      export default defineNuxtPlugin(({ vueApp }) => {
        vueApp.use(Buefy, {
          defaultIconComponent: Self,
          defaultIconPack: undefined,
        });
      })
    `,
  });

  const port = await getPort();

  const nuxt = execaCommand('nuxt dev', {
    cwd,
    env: { NODE_ENV: '', PORT: String(port) },
    reject: false,
  });

  await nuxtDevReady(port);

  try {
    await page.goto(`http://localhost:${port}`);
    await expect(page.locator('.icon')).toHaveScreenshot();
  } finally {
    await kill(nuxt.pid!);
  }
});
