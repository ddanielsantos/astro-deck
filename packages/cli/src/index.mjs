#!/usr/bin/env node

import yargs from "yargs";

yargs(process.argv.slice(2))
	.scriptName("astro-deck")
	.usage("$0 <cmd> [args]")
	.command(
		"deck",
		"builds the presentation deck",
		(_y) => {},
		async (args) => {
			console.log(args);
		},
	)
	.help().argv;
