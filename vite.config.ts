import { defineConfig } from "vite";

export default defineConfig({
	root: "src",
	base: "",
	appType: "spa",
	build: {
		minify: "esbuild",
		outDir: "../dist",
		rollupOptions: {
			input: {
				main: "src/index.html",
			},
		},
		sourcemap: true,
	},
	css: {
		devSourcemap: true,
		modules: {
			scopeBehaviour: "global",
		},
	},
	server: {
		hmr: true,
	},
});
