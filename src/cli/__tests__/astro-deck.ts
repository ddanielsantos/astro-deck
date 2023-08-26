import { existsSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { execa, ExecaReturnValue } from "execa";

export type AstroDeckCommand = "deck";

type AstroDeckResult = {
	execa: ExecaReturnValue<string>;
	numberOfSlides: number;
};

/**
 * Runs the Astro Deck CLI with the given options and commands
 */
export async function astroDeck(
	command: AstroDeckCommand,
): Promise<AstroDeckResult> {
	const indexFile = resolve("dist", "cli", "index.js");

	if (!existsSync(indexFile)) {
		throw new Error(
			"Could not find the index file. Did you forget to build the CLI?",
		);
	}

	return {
		execa: await execa("node", [indexFile, command, "./deck.mdx"], {
			stdio: "inherit",
			cwd: join(__dirname, "__fixtures__"),
		}),
		numberOfSlides: getNumberOfSlides(),
	};
}

function getNumberOfSlides(): number {
	const pagesFolder = resolve("src", "pages", "slides");

	return readdirSync(pagesFolder).filter((file: string) =>
		file.endsWith(".mdx"),
	).length;
}
