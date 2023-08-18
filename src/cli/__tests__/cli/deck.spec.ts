import { it, expect, afterEach } from "vitest";

import { astroDeck } from "../astro-deck.js";
import {
	prepareEnvironment,
	restoreEnvironment,
} from "../deck-file-helpers.js";

afterEach(() => {
	restoreEnvironment();
});

it("smoke test", async () => {
	prepareEnvironment({
		deckContent: `
    <Notes>
        hello world
    </Notes>

    ---

    <Notes>
        second slide
    </Notes>
    `,
	});

	const { exitCode } = await astroDeck("deck");

	expect(exitCode).toBe(0);
});
