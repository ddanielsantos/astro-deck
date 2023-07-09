import fs from "node:fs";
import path from "node:path";

export function createSlidesFolder() {
	const slides_folder = path.resolve("src/pages/slides");
	if (!fs.existsSync(slides_folder)) {
		fs.mkdirSync(slides_folder);
	}
}
