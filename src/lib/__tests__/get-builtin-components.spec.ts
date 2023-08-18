import { it, expect } from "vitest";

import { getBuiltinComponents } from "../get-builtin-components.js";

it("should handle duplicated components", () => {
	const slide = `
        <Head>
            <title>astro-deck</title>
        </Head>

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

	const components = getBuiltinComponents(slide);

	expect(components).toMatchSnapshot();
	expect(components.length).toBe(3);
	expect(components).toStrictEqual(["Head", "Header", "StepList"]);
});

it("should ignore custom components", () => {
	const slide = `
        <Head>
            <title>astro-deck</title>
        </Head>

        <MyCustomComponent>
            my awesome title
        </MyCustomComponent>

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

	const components = getBuiltinComponents(slide);

	expect(components).toMatchSnapshot();
	expect(components.length).toBe(3);
	expect(components).toStrictEqual(["Head", "Header", "StepList"]);
});
