import path from 'node:path'

import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import watchAndRun from 'vite-plugin-watch-and-run'

// https://astro.build/config
export default defineConfig({
	integrations: [mdx(), react()],
    vite: {
        plugins: [
            watchAndRun([
                {
                    name: 'deck',
                    run: 'pnpm deck',
                    watchKind: 'change',
                    // TODO: this should be a custom path
                    watch: path.resolve('deck.mdx')
                }
            ])
        ]
    },
    experimental: {
        viewTransitions: true
    }
});
