import UnoCSS from "unocss/vite"
import { defineConfig as defineViteConfig } from "vite"
import { defineConfig } from "wxt"

// See https://wxt.dev/api/config.html
export default defineConfig({
	runner: {
disabled: true
	},
	modules: ["@wxt-dev/module-vue"],
	manifest: {
		permissions: ['cookies', 'activeTab'],
		action: {},
		host_permissions: ['<all_urls>'],
		// web_accessible_resources: [{
		//   resources: ["views/pull-requests.html"],
		//   "matches": [ "<all_urls>" ]
		// }]
	},
	vite: () =>
		defineViteConfig({
			plugins: [UnoCSS()]
		}),
	outDir: "extension"
})
