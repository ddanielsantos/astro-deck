export function getComponentsFromSlide(slide: string) {
	const JSX_COMPONENT_MATCHER = /(?<=<)([A-Z][A-z]*)(?=[^/]*\/?>)/g;

	const components = slide.match(JSX_COMPONENT_MATCHER);

	if (!components) {
		return [];
	}

	return [...new Set(components)];
}
