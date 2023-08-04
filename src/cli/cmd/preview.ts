import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { cpSync } from "node:fs";
import type { CommandModule } from "yargs";

import { astro } from "../astro.js";

const command: CommandModule<{}, { dist: string }> = {
	command: "preview [dist]",
	describe: "Preview the deck in the browser",
	builder: {
		dist: {
			describe: "The directory where the deck was built",
			type: "string",
			default: "dist",
		},
	},
	handler: async (args) => {
		const __dirname = dirname(fileURLToPath(import.meta.url));

		const from = resolve(__dirname, "..", "..", "..", "dist");
		const to = args.dist;

		cpSync(from, to, { recursive: true });

		await astro(args, "preview");
	},
};

export default command;
