import { readFileSync } from "node:fs";

export interface Presentation {
    slides: string[];
    number_of_slides: number;
}

export const mdx_to_presentation = (file: string): Presentation => {
    const input = readFileSync("src/" + file, "utf8");

    const slides = input.split("---");

    return {
        slides,
        number_of_slides: slides.length,
    };
};
