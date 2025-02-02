import presetWebFonts from "@unocss/preset-web-fonts"
import { createLocalFontProcessor } from "@unocss/preset-web-fonts/local"
import { presetUno, transformerDirectives } from "unocss"
import { defineConfig } from "unocss/vite"

export default defineConfig({
	presets: [
		presetUno(),
		presetWebFonts({
			provider: "bunny",
			fonts: {
				sans: "Fira Code:300,400,500,600,700"
			},
			processors: createLocalFontProcessor({
				cacheDir: "node_modules/.cache/unocss/fonts",
				fontAssetsDir: "public/fonts",
				fontServeBaseUrl: "/fonts"
			})
		})
	],
	transformers: [transformerDirectives()]
})
