import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execa } from "execa";
import type { ArgumentsCamelCase } from "yargs";

export type AstroOptions = "dev" | "build" | "preview";

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Runs the Astro CLI with the given options and commands
 */
export async function astro(
	args: ArgumentsCamelCase,
	astroOptions: AstroOptions,
) {
	const astroCommands = args._.slice(1);

	const astroDeckFolder = resolve(__dirname, "..", "..");

	await execa("astro", [astroOptions, ...astroCommands.map(toString)], {
		stdio: "inherit",
		cwd: astroDeckFolder,
		preferLocal: true,
	});
}
