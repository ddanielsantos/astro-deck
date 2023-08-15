import { it, expect } from "vitest";

import { getSlideContent } from "../get-slide-content.js";

it("should generate slide content correctly", async () => {
	const components = ["Notes", "Head"];
	const slide = "<Notes>\n\ttest\n</Notes>\n \n<Head>\n\ttest\n</Head>\n";

	const actual = getSlideContent(components, slide);

	await expect(actual).toMatchFileSnapshot(
		"./__snapshots__/get-slide-content/correct_slide_output",
	);
});
