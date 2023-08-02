import { it, expect } from "vitest";

import { getSlidesFromContent } from "../get-slides-from-content.js";

it("split slides from content", () => {
	const content = `
        <Head>
        <title>Astro Deck</title>
        </Head>

        <Notes>
        Hope you enjoy the show!
        </Notes>

        ---

        # Hello

        <Notes>
        This is a note
        </Notes>

        ---

        # Bye

        <Notes>
        This is another note
        </Notes>
    `;

	const slides = getSlidesFromContent(content);
	const actual = slides.length;

	expect(actual).toBe(3);
	expect(slides).toMatchSnapshot();
});
