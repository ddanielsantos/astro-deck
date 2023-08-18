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

	return execa(
		"node",
		[indexFile, command, "./src/cli/__tests__/__fixtures__/deck.mdx"],
		{
			stdio: "inherit",
		},
	);
}
