import fs from "node:fs";
import path from "node:path";

import { createSlidesFolderOrTurnEmpty } from "./create-slides-folder.js";
import { getSlidesFromContent } from "./get-slides-from-content.js";
import { getComponentsFromSlide } from "./get-components-from-slide.js";
import { getSlideContent } from "./get-slide-content.js";
import { getImportedFilesPath } from "./get-imported-files-path.js";

export function mdxToPresentation(
	deckPath: fs.PathOrFileDescriptor,
	astroDeckPagesFolder: string,
) {
	let mdxFileContent = fs.readFileSync(deckPath, "utf-8");

	createSlidesFolderOrTurnEmpty(astroDeckPagesFolder);

	const rawImportStrings = getImportedFilesPath(mdxFileContent);

	for (const rawImport of rawImportStrings) {
		const filePath = path.resolve(astroDeckPagesFolder, rawImport);
		fs.cpSync(rawImport, filePath, { recursive: true });

		const slidesFolderPath = path.resolve(astroDeckPagesFolder, "slides");

		const corrected = path
			.relative(slidesFolderPath, filePath)
			.split(path.sep)
			.join("/");

		mdxFileContent = mdxFileContent.replace(rawImport, corrected);
	}

	for (const [index, slide] of getSlidesFromContent(mdxFileContent).entries()) {
		const slideComponents = getComponentsFromSlide(slide);
		const slideContent = getSlideContent(slideComponents, slide);

		const slidePath = path.resolve(
			astroDeckPagesFolder,
			"slides",
			`${index + 1}.mdx`,
		);

		fs.writeFileSync(slidePath, slideContent, {
			flag: "w+",
		});
	}
}
