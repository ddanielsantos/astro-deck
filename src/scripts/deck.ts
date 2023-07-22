import fs from "node:fs";
import path from "node:path";

import { mdxToPresentation } from "../lib/mdx-to-presentation";
import { create_stats_file } from "../lib/create-stats-file";

async function run() {
	const p = path.resolve("deck.mdx");
	const content = fs.readFileSync(p, "utf-8");

	mdxToPresentation(content);
	create_stats_file();
}

run()
	.then(() => process.exit(0))
	.catch((_) => process.exit(1));
