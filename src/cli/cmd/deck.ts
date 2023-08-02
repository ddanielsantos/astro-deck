import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { CommandModule } from "yargs";

import { mdxToPresentation } from "../../lib/mdx-to-presentation.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const command: CommandModule<{}, { path: string }> = {
	command: "deck <path>",
	describe: "Build a presentation from a given .mdx file",
	builder: {
		path: {
			describe: "Path to the .mdx file",
		},
	},

	handler: function (args) {
		const astroDeckPagesFolder = resolve(
			__dirname,
			"..",
			"..",
			"..",
			"src",
			"pages",
		);

		try {
			const filePath = resolve(args.path);
			mdxToPresentation(filePath, astroDeckPagesFolder);
		} catch (error) {
			console.error(`[astro-deck] error: ${(error as Error).message}`);
		}
	},
};

export default command;
