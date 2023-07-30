import fs from "node:fs";
import path from "node:path";

import { createSlidesFolder } from "./create-slides-folder";
import { getSlidesFromContent } from "./get-slides-from-content";
import { getComponentsFromSlide } from "./get-components-from-slide";
import { getImportStringsFromComponents } from "./get-import-strings-from-slide";

const layout_import = `---
layout: ../../layouts/slide-wrapper.astro
---

`;

export function mdxToPresentation(mdx: string) {
	createSlidesFolder();

	for (const [index, slide] of getSlidesFromContent(mdx).entries()) {
		const file_path = path.resolve(`src/pages/slides/${index + 1}.mdx`);

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
