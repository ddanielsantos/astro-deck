import { cpSync, rmSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { CommandModule } from "yargs";

import { astro } from "../astro.js";
import deck from "./deck.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const command: CommandModule<{}, { dist: string; path: string }> = {
	command: "build <path> <dist>",
	describe: "Build the given .mdx file",
	builder: {
		path: {
			describe: "Path to the .mdx file",
		},
		dist: {
			describe: "Path to the dist directory",
			type: "string",
			default: "dist",
		},
	},
	handler: async (args) => {
		deck.handler({
			...args,
		});

		await astro(args, "build");

		const dir = resolve(__dirname, "..", "..", "..");
		const from = resolve(dir, "output");

		const to = args.dist;

		cpSync(from, to, { recursive: true });

		const pages = resolve(dir, "src", "pages");
		rmSync(pages, { recursive: true });
	},
};

export default command;
