const path = require("node:path");
const { mdxToPresentation } = require("../../lib/mdx-to-presentation");

exports.command = "deck <path>";
exports.desc = "Build a presentation from a given .mdx file";
exports.builder = {
	path: {
		describe: "Path to the .mdx file",
	},
};
exports.handler = function (argv) {
	let resolvedPath;

	try {
		resolvedPath = path.resolve(argv.path);
        mdxToPresentation(resolvedPath);
	} catch (error) {
        console.error(`Error: ${error.message}`);
	}
};
