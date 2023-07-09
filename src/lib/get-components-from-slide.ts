export function getComponentsFromSlide(slide: string): string[] {
	const components = slide.match(/<([A-Z][a-z]+)/g);
	if (!components) {
		return [];
	}

	const component_names = components.map((component) => {
		return component.replace("<", "").replace(" ", "");
	});

	return [...new Set(component_names)];
}
