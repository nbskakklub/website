"use client"

import { ReactElement } from "react";
import style from "styled-jsx/style";

function scrollToTop() {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}

export default function BackToTop(
    { children }: { children: React.ReactNode }
) {
    return (
        <>
            <a onClick={scrollToTop}>{children}</a>
            <style jsx>
                {`
                a {
                    cursor: pointer;
                }
              `}
            </style>
        </>
    )

}