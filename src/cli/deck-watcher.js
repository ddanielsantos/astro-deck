const path = require("node:path");
const fs = require("node:fs");

const { handler: deckHandler } = require("./cmd/deck");

/**
 * Watches for changes in the provided deck file and rebuilds the presentation, uses the `deck` command under the hood
 * @param {import('yargs').Argv} args - The arguments passed to the CLI
 * @param {number} delay - The delay in milliseconds to wait between OS events
 */
function deckWatcher(args, delay) {
	let timeout;

	const watcher = fs.watch(path.resolve(args.path), (type) => {
		if (type === "change") {
			if (timeout) {
				clearTimeout(timeout);
			}

			timeout = setTimeout(() => {
				console.log("[astro-deck] Rebuilding deck...");
				deckHandler(args);
				timeout = null;
			}, delay);
		}
	});

	["SIGINT", "SIGTERM", "SIGQUIT"].forEach((signal) => {
		process.on(signal, () => {
			watcher.close();
			process.exit();
		});
	});
}

module.exports = {
	deckWatcher,
};
