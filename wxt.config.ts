import { defineConfig } from 'wxt';
import {defineConfig as defineViteConfig} from 'vite'
import UnoCSS from "unocss/vite"

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-vue'],
  manifest: {
    action: {},
    // web_accessible_resources: [{
    //   resources: ["views/pull-requests.html"],
    //   "matches": [ "<all_urls>" ]
    // }]
  },
  vite: () => defineViteConfig({
    plugins: [
      UnoCSS()
    ]
  })
});
