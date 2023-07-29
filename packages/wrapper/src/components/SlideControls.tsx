import React from "react";

interface ButtonProps {
	direction: "next" | "prev";
	shouldShow: boolean;
	href: string;
	id?: string;
	children?: React.ReactNode;
	debug?: boolean;
}

const Button = (props: ButtonProps) => {
	if (!props.shouldShow) {
		return null;
	}

	const directionBasedProps =
		props.direction === "prev" ? { left: "0" } : { right: "0" };
	const debugProps = props.debug ? { outline: "1px solid red" } : {};

	return (
		<a
			id={props.id}
			href={props.href}
			style={{
				position: "absolute",
				top: "0",
				width: "200px",
				height: "100%",
				// TODO: handle this later (custom children idk)
				opacity: 0,
				...directionBasedProps,
				...debugProps,
			}}
		>
			{props.children || props.direction}
		</a>
	);
};

interface Props {
	hasPrev: boolean;
	hasNext: boolean;
	prevSlideUrl: string;
	nextSlideUrl: string;
}

export const SlideControls = ({
	hasNext,
	hasPrev,
	nextSlideUrl,
	prevSlideUrl,
}: Props) => {
	return (
		<>
			{/* {hasPrev && <a href={prevSlideUrl}>prev</a>} */}
			<Button
				direction="prev"
				href={prevSlideUrl}
				shouldShow={hasPrev}
				id="prev"
			/>
			<Button
				direction="next"
				href={nextSlideUrl}
				shouldShow={hasNext}
				id="next"
			/>
		</>
	);
};
