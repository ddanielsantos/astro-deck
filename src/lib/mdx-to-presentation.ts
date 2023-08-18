import fs from "node:fs";
import path from "node:path";
import url from "node:url";

import { createSlidesFolderOrTurnEmpty } from "./create-slides-folder.js";
import { getSlidesFromContent } from "./get-slides-from-content.js";
import { getBuiltinComponents } from "./get-builtin-components.js";
import { getSlideContent } from "./get-slide-content.js";
import { getImportedFilesPath } from "./get-imported-files-path.js";

function updateContentImports(
	mdxFileContent: string,
	astroDeckPagesFolder: string,
	rawImport: string,
) {
	const filePath = path.resolve(astroDeckPagesFolder, rawImport);
	fs.cpSync(rawImport, filePath, { recursive: true });

	const slidesFolderPath = path.resolve(astroDeckPagesFolder, "slides");

	const corrected = path
		.relative(slidesFolderPath, filePath)
		.split(path.sep)
		.join("/");

	return mdxFileContent.replace(rawImport, corrected);
}

function writeSlideFile(
	astroDeckPagesFolder: string,
	index: number,
	slideContent: string,
) {
	const slidePath = path.resolve(
		astroDeckPagesFolder,
		"slides",
		`${index + 1}.mdx`,
	);

	fs.writeFileSync(slidePath, slideContent, {
		flag: "w+",
	});
}

function getPagesFolderPath() {
	const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

	return path.resolve(__dirname, "..", "..", "src", "pages");
}

export function mdxToPresentation(deckPath: fs.PathOrFileDescriptor) {
	let mdxFileContent = fs.readFileSync(deckPath, "utf-8");

	const astroDeckPagesFolder = getPagesFolderPath();

	createSlidesFolderOrTurnEmpty(astroDeckPagesFolder);

	const rawImportStrings = getImportedFilesPath(mdxFileContent);

	for (const rawImport of rawImportStrings) {
		mdxFileContent = updateContentImports(
			mdxFileContent,
			astroDeckPagesFolder,
			rawImport,
		);
	}

	for (const [index, slide] of getSlidesFromContent(mdxFileContent).entries()) {
		const builtinComponents = getBuiltinComponents(slide);
		const slideContent = getSlideContent(builtinComponents, slide);

		writeSlideFile(astroDeckPagesFolder, index, slideContent);
	}
}
