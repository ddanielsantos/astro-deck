function getImportStringsFromComponents(components: string[]) {
	const unique_components = [...new Set(components)];

	const imports = unique_components.map((component) => {
		return `import { ${component} } from '../../components/${component}'\n`;
	});

	return imports;
}

export function getSlideContent(components: string[], slide: string): string {
	const layoutImport =
		"---\nlayout: ../../layouts/slide-wrapper.astro\n---\n\n";
	const imports = getImportStringsFromComponents(components).join("") + "\n";

	return layoutImport + imports + slide;
}
