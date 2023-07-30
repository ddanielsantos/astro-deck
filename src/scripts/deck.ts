import path from "node:path";

import { mdxToPresentation } from "../lib/mdx-to-presentation";

async function run() {
	const p = path.resolve("deck.mdx");

	mdxToPresentation(p);
}

run()
	.then(() => process.exit(0))
	.catch((_) => process.exit(1));
