import { endent } from '@dword-design/functions'
import tester from '@dword-design/tester'
import testerPluginComponent from '@dword-design/tester-plugin-component'
import testerPluginPuppeteer from '@dword-design/tester-plugin-puppeteer'
import packageName from 'depcheck-package-name'
import { createRequire } from 'module'

const _require = createRequire(import.meta.url)

export default tester(
  {
    works: {
      files: {
        'plugins/buefy.js': endent`
        import Vue from 'vue'
        import Buefy from '${packageName`buefy`}'
        import DragIcon from '${packageName`@mdi/svg`}/svg/drag.svg'
        import 'buefy/dist/buefy.css'

        Vue.use(Buefy, {
          defaultIconComponent: 'self',
          defaultIconPack: null,
        })

        Vue.component('DragIcon', DragIcon)
      `,
      },
      nuxtConfig: {
        modules: [packageName`nuxt-svg-loader`],
        plugins: ['~/plugins/buefy.js'],
      },
      page: endent`
      <template>
        <b-icon icon="drag" />
      </template>
    `,
      async test() {
        await this.page.goto('http://localhost:3000')
        
        const icon = await this.page.waitForSelector('.icon')
        expect(await icon.screenshot()).toMatchImageSnapshot(this)
      },
    },
  },
  [
    testerPluginComponent({ componentPath: _require.resolve('./index.vue') }),
    testerPluginPuppeteer(),
  ]
)
