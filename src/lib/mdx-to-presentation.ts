import fs from "node:fs";
import p from "node:path";

import { createSlidesFolderOrTurnEmpty } from "./create-slides-folder.js";
import { getSlidesFromContent } from "./get-slides-from-content.js";
import { getComponentsFromSlide } from "./get-components-from-slide.js";
import { getImportStringsFromComponents } from "./get-import-strings-from-slide.js";

const layoutImport = `---
layout: ../../layouts/slide-wrapper.astro
---

`;

export function mdxToPresentation(
	path: fs.PathOrFileDescriptor,
	astroDeckPagesFolder: string,
) {
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
}
