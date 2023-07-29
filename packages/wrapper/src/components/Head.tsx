import React from "react";

type Props = React.JSX.IntrinsicAttributes 
    & React.ClassAttributes<HTMLHeadElement> 
    & React.HTMLAttributes<HTMLHeadElement>

export const Head = (props: Props) => {
	return <head {...props}/>;
};
