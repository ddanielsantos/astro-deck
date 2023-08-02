import { resolve } from "node:path";
import { watch } from "node:fs";

import d from "./cmd/deck.js";
import type { ArgumentsCamelCase } from "yargs";

/**
 * Watches for changes in the provided deck file and rebuilds the presentation, uses the `deck` command under the hood
 */
export function deckWatcher(
	args: ArgumentsCamelCase<{ path: string }>,
	delay: number | undefined,
) {
	let timeout: NodeJS.Timeout | null;

	const watcher = watch(resolve(args.path), (type) => {
		if (type === "change") {
			if (timeout) {
				clearTimeout(timeout);
			}

			timeout = setTimeout(() => {
				console.log("[astro-deck] Rebuilding deck...");
				d.handler(args);
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
