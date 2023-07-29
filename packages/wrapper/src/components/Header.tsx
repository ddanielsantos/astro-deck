import React from "react";

type Props = React.JSX.IntrinsicAttributes &
	React.ClassAttributes<HTMLElement> &
	React.HTMLAttributes<HTMLElement>;

export const Header = (props: Props) => {
	return <header {...props} />;
};
