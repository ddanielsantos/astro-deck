import fs from "node:fs";
import path from "node:path";

import { createSlidesFolder } from "./create-slides-folder";
import { getSlidesFromContent } from "./get-slides-from-content";

const layout_import = `---
import { SlideWrapper } from '../../layouts/SlideWrapper'
---

`;

export function mdxToPresentation(mdx: string) {
	createSlidesFolder();

	const slide_template = `<div class="slide" id="{#}"><!--SLIDE--></div>\n`;

	let content = "";
	for (const [index, slide] of getSlidesFromContent(mdx).entries()) {
		const final_slide = slide_template
			.replace("<!--SLIDE-->", slide)
			.replace("{#}", (index + 1).toString());

		content += final_slide;
	}

	const open_layout = `<SlideWrapper client:only="react">\n`;
	const close_layout = "\n</SlideWrapper>";
	content = layout_import + open_layout + content + close_layout;

	const file_path = path.resolve("src/pages/slides/index.astro");
	fs.writeFileSync(file_path, content, {
		flag: "w+",
	});

	console.log("Done!");
}
