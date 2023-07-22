import { useSlide } from "./useSlide";

import React from "react";

interface Props {
    children: React.ReactNode
}

export function SlideWrapper(props: Props) {
    const { current_slide, has_next, has_prev, number_of_slides } = useSlide();

    return (
        <div>
            hello from layout!!
            <p>
                slide {current_slide} of {number_of_slides}
            </p>

            {has_prev && <a href={`/slides#${current_slide - 1}`}>prev</a>}
            {has_next && <a href={`/slides#${current_slide + 1}`}>next</a>}

            {props.children}
        </div>
    )
}