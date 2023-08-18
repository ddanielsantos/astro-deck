import fs from "node:fs";
import path from "node:path";

import { expect } from "vitest";

const DECK_FILE = path.resolve(
	"src",
	"cli",
	"__tests__",
	"__fixtures__",
	"deck.mdx",
);

interface EnvironmentOptions {
	deckContent: string;
}

export function prepareEnvironment({
	deckContent: content,
}: EnvironmentOptions): void {
	fs.writeFileSync(DECK_FILE, content.trim().replaceAll("    ", ""), {
		encoding: "utf-8",
	});
}

const PAGES_FOLDER = path.resolve("src", "pages");

const SLIDES_FOLDER = path.resolve(PAGES_FOLDER, "slides");

export function restoreEnvironment(): void {
	if (fs.existsSync(PAGES_FOLDER)) {
		fs.rmdirSync(PAGES_FOLDER, { recursive: true });
	}
	fs.writeFileSync(DECK_FILE, "");
}

export function expectSlides(qty: number) {
	const slides = fs.readdirSync(SLIDES_FOLDER);

	expect(slides.length).toBe(qty);
}
