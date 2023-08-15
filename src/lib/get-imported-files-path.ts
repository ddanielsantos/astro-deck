export function getImportedFilesPath(deck: string): string[] {
	const lines = deck.split("\n");

	const IMPORT_REGEX = /^\bimport\b/;

	const QUOTES_REGEX = /['"](.*)['"]/;

	return lines
		.filter((line) => IMPORT_REGEX.test(line))
		.map((imp) => {
			const match = imp.match(QUOTES_REGEX);

			if (match) {
				return match[1];
			}

			return "";
		});
}
