import { cpSync, rmSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { CommandModule } from "yargs";

import { astro } from "../astro.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const command: CommandModule<{}, { dist: string }> = {
	command: "build <path> <dist>",
	describe: "Build the given .mdx file",
	builder: {
		path: {
			describe: "Path to the .mdx file",
		},
		dist: {
			describe: "Path to the output directory",
			type: "string",
			default: "dist",
		},
	},
	handler: async (args) => {
		await astro(args, "build");

		const astroDeckDistFolder = resolve(__dirname, "..", "..", "..", "dist");

		cpSync(astroDeckDistFolder, args.dist, { recursive: true });
		rmSync(astroDeckDistFolder, { recursive: true });
	},
};

export default command;
