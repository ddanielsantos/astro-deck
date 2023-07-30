const fs = require("node:fs");
const path = require("node:path");

/**
 * @param {string} astroDeckPagesFolder Where the pages folder is located
 */
function createSlidesFolderOrTurnEmpty(astroDeckPagesFolder) {
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

module.exports = {
	createSlidesFolderOrTurnEmpty,
};
