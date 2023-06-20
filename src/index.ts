import { micromark } from "micromark";
import { mdx } from "micromark-extension-mdx";
import { mdx_to_presentation } from "./mdx-to-presentation";

const { slides, number_of_slides } = mdx_to_presentation("demo.mdx");

slides.forEach((s, i) => {
    console.log(`Slide ${i + 1} of ${number_of_slides}`);

    const output = micromark(s, { extensions: [mdx()] });

    console.log(output);
});
