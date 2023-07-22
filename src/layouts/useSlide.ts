import { number_of_slides } from "../lib/stats.json";

import React from "react";

// rome-ignore lint/nursery/useCamelCase: <explanation>
function get_current_slide() {
	const raw = window.location.hash.replace("#", "");

	return Number(raw) || 1;
}

export function useSlide() {
	const [current_slide, set_current_slide] = React.useState(1);

	const has_prev = current_slide > 1;
	const has_next = current_slide < number_of_slides;

	// rome-ignore lint/nursery/useCamelCase: <explanation>
	function hash_change_handler() {
		const this_rendering_slide = get_current_slide();

		if (this_rendering_slide > number_of_slides) {
			set_current_slide(number_of_slides);
			return;
		}

		set_current_slide(this_rendering_slide);
	}

	React.useEffect(() => {
		set_current_slide(get_current_slide());

		window.addEventListener("hashchange", hash_change_handler);

		return () => {
			window.removeEventListener("hashchange", hash_change_handler);
		};
	}, []);

	return {
		current_slide,
		set_current_slide,
		has_prev,
		has_next,
		number_of_slides,
	};
}
