import fs from "node:fs";
import path from "node:path";

import { getSlidesFromContent } from "./get-slides-from-content";

export function get_number_of_slides() {
	const p = path.resolve("deck.mdx");
	const content = fs.readFileSync(p, "utf-8");

	return getSlidesFromContent(content).length;
}
