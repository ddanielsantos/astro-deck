#!/usr/bin/env node
import yargs from "yargs/yargs";
import { command } from "./cmd/index.js";

yargs(process.argv.slice(2))
	.scriptName("astro-deck")
	.usage("$0 <cmd> [args]")
	.command(command)
	.help();
