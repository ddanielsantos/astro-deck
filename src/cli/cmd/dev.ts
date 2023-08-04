import type { CommandModule } from "yargs";

import { astro } from "../astro.js";
import { deckWatcher } from "../deck-watcher.js";
import deck from "./deck.js";

const command: CommandModule<{}, { path: string; shouldWatch?: boolean }> = {
	command: "dev <path>",
	describe: "Start the development server for the given .mdx file",
	builder: {
		path: {
			describe: "Path to the .mdx file",
		},
		shouldWatch: {
			describe: "Whether to watch for changes in the deck file",
		},
	},

	handler: async function (args) {
		deck.handler(args);

		if (args.shouldWatch) {
			deckWatcher(args, 300);
		}

		await astro(args, "dev");
	},
};

export default command;
