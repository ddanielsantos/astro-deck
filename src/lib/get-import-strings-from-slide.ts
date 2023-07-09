export function getImportStringsFromComponents(components: string[]): string[] {
	const unique_components = [...new Set(components)];

	const imports = unique_components.map((component) => {
		return `import { ${component} } from '../../components/${component}'`;
	});

	return imports;
}
