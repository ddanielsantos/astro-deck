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
		deckContent: `import './MyStyle.css'
        import { MyComp } from './comps/'
        import { Notes } from './comps/'
        
        testing
        
        ---
        
        testing slide 2
        
        <MyComp/>
        
        <Notes>
            my custom not
        </Notes>`,
	});

	const { execa, numberOfSlides } = await astroDeck("deck");

	expect(execa.exitCode).toBe(0);
	expect(numberOfSlides).toBe(2);
});
