import { it, expect } from "vitest";

import { getComponentsFromSlide } from "../get-components-from-slide";

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
  `;

	const components = getComponentsFromSlide(slide);

	expect(components).toMatchSnapshot();
	expect(components.length).toBe(3);
	expect(components).toStrictEqual(["Head", "Title", "Header"]);
});
