import fs from "node:fs";
import path from "node:path";

export function createSlidesFolderOrTurnEmpty(astroDeckPagesFolder: string) {
	const slidesFolder = path.resolve(astroDeckPagesFolder, "slides");

	if (!fs.existsSync(slidesFolder)) {
		fs.mkdirSync(slidesFolder, { recursive: true });
		return;
	}

	const files = fs.readdirSync(slidesFolder);
	for (const file of files) {
		fs.rmSync(path.resolve(slidesFolder, file));
	}
}
