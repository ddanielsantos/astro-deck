const fs = require("node:fs");
const p = require("node:path");

const { createSlidesFolder } = require("./create-slides-folder");
const { getSlidesFromContent } = require("./get-slides-from-content");
const { getComponentsFromSlide } = require("./get-components-from-slide");
const {
	getImportStringsFromComponents,
} = require("./get-import-strings-from-slide");

const layout_import = `---
layout: ../../layouts/slide-wrapper.astro
---

`;

function mdxToPresentation(path) {
	const mdx = fs.readFileSync(path, "utf-8");

	createSlidesFolder();

	for (const [index, slide] of getSlidesFromContent(mdx).entries()) {
		const file_path = p.resolve(`src/pages/slides/${index + 1}.mdx`);

		const slide_components = getComponentsFromSlide(slide);

		const content =
			layout_import +
			getImportStringsFromComponents(slide_components).join("\n") +
			"\n\n" +
			slide;

		fs.writeFileSync(file_path, content, {
			flag: "w+",
		});
	}

	console.log("Done!");
}

module.exports = {
	mdxToPresentation,
};
