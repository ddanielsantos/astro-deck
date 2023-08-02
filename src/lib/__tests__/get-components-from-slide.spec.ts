import { it, expect } from "vitest";

import { getComponentsFromSlide } from "../get-components-from-slide.js";

it("should handle duplicated components", () => {
	const slide = `
        <Head>
            <title>astro-deck</title>
        </Head>

        <Title>
            my awesome title
        </Title>

        <Header>

        header 1

        </Header>

        <Header>

        header 2

        </Header>

        <StepList >

            Uppercase text
            steplist    

        </StepList>

        <StepList/>
  `;

	const components = getComponentsFromSlide(slide);

	expect(components).toMatchSnapshot();
	expect(components.length).toBe(4);
	expect(components).toStrictEqual(["Head", "Title", "Header", "StepList"]);
});
