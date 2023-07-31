const { astro } = require("../astro");
const { deckWatcher } = require("../deck-watcher");

exports.command = "dev <path>";
exports.desc = "Start the development server for the given .mdx file";
exports.builder = {
	path: {
		describe: "Path to the .mdx file",
		type: "string",
	},
	shouldWatch: {
		describe: "Whether to watch for changes in the deck file",
		type: "boolean",
		default: true,
	},
};

/**
 * @param {import('yargs').Argv} args
 */
exports.handler = async function (args) {
	if (args.shouldWatch) {
		deckWatcher(args, 300);
	}

	await astro(args, "dev");
};
