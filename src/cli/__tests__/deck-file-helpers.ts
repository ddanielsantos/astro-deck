import fs from "node:fs";
import path from "node:path";

import { expect } from "vitest";

export function prepareEnvironment(content: string): void {}

const PAGES_FOLDER = path.resolve("src", "pages");

const SLIDES_FOLDER = path.resolve(PAGES_FOLDER, "slides");

export function restoreEnvironment(): void {
	fs.rmdirSync(PAGES_FOLDER, { recursive: true });
}

export function expectSlides(qty: number) {
	const slides = fs.readdirSync(SLIDES_FOLDER);

	expect(slides.length).toBe(qty);
}
