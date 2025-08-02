import type { App } from 'vue';

import component from './src/index.vue';

component.install = (app: App) => app.component('BuefySvgIcon', component);

if (typeof globalThis !== 'undefined') {
  (globalThis as Record<string, unknown>).BuefySvgIcon = component;
}

export default component;