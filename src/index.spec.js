import { endent as javascript } from '@dword-design/functions';
import tester from '@dword-design/tester';
import testerPluginComponent from '@dword-design/tester-plugin-component';
import packageName from 'depcheck-package-name';
import { createRequire } from 'module';
import { chromium } from 'playwright';

const _require = createRequire(import.meta.url);

export default tester(
  {
    works: {
      files: {
        'nuxt.config.js': javascript`
          import svgLoader from '${packageName`vite-svg-loader`}'

          export default {
            vite: {
              plugins: [svgLoader()],
            },
          }
        `,
        'plugins/buefy.js': javascript`
          import Buefy from '${packageName`buefy`}'
          import DragIcon from '${packageName`@mdi/svg`}/svg/drag.svg'
          import 'buefy/dist/buefy.css'

          export default defineNuxtPlugin(nuxtApp => {
            nuxtApp.vueApp.use(Buefy, {
              defaultIconComponent: 'self',
              defaultIconPack: undefined,
            })
            nuxtApp.vueApp.component('DragIcon', DragIcon)
          })
        `,
      },
      page: javascript`
        <template>
          <b-icon icon="drag" />
        </template>
      `,
      async test() {
        await this.page.goto('http://localhost:3000');
        const icon = await this.page.waitForSelector('.icon');
        expect(await icon.screenshot()).toMatchImageSnapshot(this);
      },
    },
  },
  [
    testerPluginComponent({ componentPath: _require.resolve('./index.vue') }),
    {
      async after() {
        await this.browser.close();
      },
      async before() {
        this.browser = await chromium.launch();
        this.page = await this.browser.newPage();
      },
    },
  ],
);
