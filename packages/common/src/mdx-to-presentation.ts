import fs from "node:fs";

export function mdxToPresentation(path: string) {
	const content = fs.readFileSync(path, "utf-8");

	mdxToPresentation(content);
}
