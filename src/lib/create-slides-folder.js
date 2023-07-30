const fs = require("node:fs");
const path = require("node:path");

function createSlidesFolder() {
	const slides_folder = path.resolve("src/pages/slides");
	if (!fs.existsSync(slides_folder)) {
		fs.mkdirSync(slides_folder, { recursive: true });
		return;
	}

	const files = fs.readdirSync(slides_folder);
	for (const file of files) {
		fs.rmSync(path.resolve(slides_folder, file));
	}
}

module.exports = {
	createSlidesFolder,
};
