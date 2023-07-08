import fs from "node:fs";
import path from "node:path";

export function mdxToSlides(): string[] {
	const p = path.resolve("deck.mdx");
	const content = fs.readFileSync(p, "utf-8");
	return content.split("---");
}

function getComponentsFromSlide(slide: string): string[] {
	const components = slide.match(/<([A-Z][a-z]+)/g);
	if (!components) {
		return [];
	}

	return components.map((component) => {
		return component.replace("<", "").replace(" ", "");
	});
}

function getImportStrings(slide: string): string {
	const components = getComponentsFromSlide(slide);

	const imports = components.map((component) => {
		return `import { ${component} } from '../../components/${component}'`;
	});

	return "---\n" + imports.join("\n") + "\n---";
}

export function mdxToPresentation() {
	createSlidesFolder();

	mdxToSlides().forEach((slide, index) => {
		const file_path = path.resolve(`src/pages/slides/${index}.astro`);

		const content = getImportStrings(slide) + "\n\n" + slide;

		fs.writeFileSync(file_path, content, {
			flag: "w+",
		});
	});

	console.log("Done!");
}

function createSlidesFolder() {
	const slides_folder = path.resolve("src/pages/slides");
	if (!fs.existsSync(slides_folder)) {
		fs.mkdirSync(slides_folder);
	}
}

mdxToPresentation();
