import { existsSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { ExecaReturnValue, execa } from "execa";

export type AstroDeckCommand = "deck";

export const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Runs the Astro Deck CLI with the given options and commands
 */
export async function astroDeck(
	command: AstroDeckCommand,
): Promise<ExecaReturnValue<string>> {
	const indexFile = "dist/cli/index.js";

	if (!existsSync(indexFile)) {
		throw new Error(
			"Could not find the index file. Did you forget to build the CLI?",
		);
	}

	return execa(
		"node",
		[indexFile, command, "./src/cli/__tests__/__fixtures__/deck.mdx"],
		{
			stdio: "inherit",
		},
	);
}
