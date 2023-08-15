import fs from "node:fs";
import p from "node:path";

import { createSlidesFolderOrTurnEmpty } from "./create-slides-folder.js";
import { getSlidesFromContent } from "./get-slides-from-content.js";
import { getComponentsFromSlide } from "./get-components-from-slide.js";
import { getSlideContent } from "./get-slide-content.js";

export function mdxToPresentation(
	path: fs.PathOrFileDescriptor,
	astroDeckPagesFolder: string,
) {
	const mdxFileContent = fs.readFileSync(path, "utf-8");

	createSlidesFolderOrTurnEmpty(astroDeckPagesFolder);

	for (const [index, slide] of getSlidesFromContent(mdxFileContent).entries()) {
		const slideComponents = getComponentsFromSlide(slide);
		const slideContent = getSlideContent(slideComponents, slide);

		const slidePath = p.resolve(
			astroDeckPagesFolder,
			"slides",
			`${index + 1}.mdx`,
		);

		fs.writeFileSync(slidePath, slideContent, {
			flag: "w+",
		});
	}
}
