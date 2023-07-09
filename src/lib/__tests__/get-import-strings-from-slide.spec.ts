import { it, expect } from "vitest";

import { getImportStringsFromComponents } from "../get-import-strings-from-slide";

it("should handle duplicated components", () => {
	const components = ["Head", "Title", "Header", "Notes", "Header"];

	const imports = getImportStringsFromComponents(components);
	const actual = imports.length;

	expect(actual).toBe(4);
	expect(imports).toMatchSnapshot();
});
