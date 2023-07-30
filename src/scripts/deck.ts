import fs from "node:fs";
import path from "node:path";

import { mdxToPresentation } from "../lib/mdx-to-presentation";

async function run() {
	const p = path.resolve("deck.mdx");
	const content = fs.readFileSync(p, "utf-8");

	mdxToPresentation(content);
}

run()
	.then(() => process.exit(0))
	.catch((_) => process.exit(1));
