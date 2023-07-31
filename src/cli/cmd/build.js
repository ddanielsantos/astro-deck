const fs = require("node:fs");
const path = require("node:path");

const { astro } = require("../astro");

exports.command = "build <path>";
exports.desc = "Build the given .mdx file";
exports.builder = {
	path: {
		describe: "Path to the .mdx file",
		type: "string",
	},
	dist: {
		describe: "Path to the output directory",
		type: "string",
		default: "dist",
	},
};

/**
 * @param {import('yargs').Argv} args
 */
exports.handler = async function (args) {
	await astro(args, "build");

	const astroDeckDistFolder = path.resolve(__dirname, "..", "..", "..", "dist");

	fs.cpSync(astroDeckDistFolder, args.dist, { recursive: true });
	fs.rmSync(astroDeckDistFolder, { recursive: true });
};
