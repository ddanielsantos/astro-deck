const fs = require("node:fs");
const p = require("node:path");

const { createSlidesFolderOrTurnEmpty } = require("./create-slides-folder");
const { getSlidesFromContent } = require("./get-slides-from-content");
const { getComponentsFromSlide } = require("./get-components-from-slide");
const {
	getImportStringsFromComponents,
} = require("./get-import-strings-from-slide");

const layoutImport = `---
layout: ../../layouts/slide-wrapper.astro
---

`;

/**
 * @param {string} path Where the .mdx file is located
 * @param {string} astroDeckPagesFolder Where the pages folder is located
 */
function mdxToPresentation(path, astroDeckPagesFolder) {
	const mdxFileContent = fs.readFileSync(path, "utf-8");

	createSlidesFolderOrTurnEmpty(astroDeckPagesFolder);

	for (const [index, slide] of getSlidesFromContent(mdxFileContent).entries()) {
		const slidePath = p.resolve(
			astroDeckPagesFolder,
			"slides",
			`${index + 1}.mdx`,
		);

		const slideComponents = getComponentsFromSlide(slide);

		const slideContent =
			layoutImport +
			getImportStringsFromComponents(slideComponents).join("\n") +
			slide;

		fs.writeFileSync(slidePath, slideContent, {
			flag: "w+",
		});
	}

	console.log("Done!");
}

module.exports = {
	mdxToPresentation,
};
