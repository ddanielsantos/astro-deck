import { it, expect } from "vitest";

import { getImportedFilesPath } from "../get-imported-files-path.js";

const DECK_FILE = `import A from './a'
import B from './path/to/file.js'
import C from "./path/to/file2.ts"
import './path/to/file3.css'
importa

# import

## important
`;

it("should recognize JS imports", () => {
	const actual = getImportedFilesPath(DECK_FILE);

	const expected = [
		"./a",
		"./path/to/file.js",
		"./path/to/file2.ts",
		"./path/to/file3.css",
	];

	expect(actual).toEqual(expected);
	expect(actual).toMatchSnapshot();
});
