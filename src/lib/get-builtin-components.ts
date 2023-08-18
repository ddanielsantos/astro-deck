const BUILTIN_COMPONENTS = ["Head", "Header", "Notes", "StepList"];

export function getBuiltinComponents(slide: string) {
	const JSX_COMPONENT_MATCHER = /(?<=<)([A-Z][A-z]*)(?=[^/]*\/?>)/g;

	let components: RegExpMatchArray | string[] | null = slide.match(
		JSX_COMPONENT_MATCHER,
	);

	if (!components) {
		return [];
	}

	components = components.filter((c) => BUILTIN_COMPONENTS.includes(c));

	return [...new Set(components)];
}
