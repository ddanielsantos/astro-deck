import fs from "node:fs";
import path from "node:path";

export function createOrClearFolder(folder: string) {
	if (!fs.existsSync(folder)) {
		fs.mkdirSync(folder, { recursive: true });
		return;
	}

	const files = fs.readdirSync(folder);
	for (const file of files) {
		fs.rmSync(path.resolve(folder, file));
	}
}
