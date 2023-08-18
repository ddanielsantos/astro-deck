import { resolve } from "node:path";
import type { CommandModule } from "yargs";

import { mdxToPresentation } from "../../lib/mdx-to-presentation.js";

const command: CommandModule<{}, { path: string }> = {
	command: "deck <path>",
	describe: "Build a presentation from a given .mdx file",
	builder: {
		path: {
			describe: "Path to the .mdx file",
		},
	},

	handler: function (args) {
		try {
			const filePath = resolve(args.path);
			mdxToPresentation(filePath);
		} catch (error) {
			console.error(`[astro-deck] error: ${(error as Error).message}`);
			console.error(error);
		}
	},
};

export default command;
