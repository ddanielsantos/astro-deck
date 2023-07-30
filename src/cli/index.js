#!/usr/bin/env node
const yargs = require("yargs");

yargs
	.scriptName("astro-deck")
    .usage('$0 <cmd> [args]')
	.commandDir("cmd")
	.help()
	.parseAsync(process.argv.slice(2)).argv;
