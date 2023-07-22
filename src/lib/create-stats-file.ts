import fs from "node:fs";
import path from "node:path";

import { get_number_of_slides } from "./get-number-of-slides";

export function create_stats_file() {
	const stats = {
		number_of_slides: get_number_of_slides(),
	};

	const file_path = path.resolve("src/lib/stats.json");

	fs.writeFileSync(file_path, JSON.stringify(stats), {
		flag: "w+",
	});
}
