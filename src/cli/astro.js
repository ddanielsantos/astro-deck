const path = require("node:path");

/**
 * Runs the Astro CLI with the given options and commands
 * @param {import('yargs').Argv} args - The arguments passed to the CLI
 * @param {AstroOptions} astroOptions - The Astro command to run
 */
async function astro(args, astroOptions) {
	const astroCommands = args._.slice(1);
	const { execa } = await import("execa");

	const astroDeckFolder = path.resolve(__dirname, "..", "..");
	await execa("astro", [astroOptions, ...astroCommands], {
		stdio: "inherit",
		cwd: astroDeckFolder,
		preferLocal: true,
	});
}

module.exports = {
	astro,
};
