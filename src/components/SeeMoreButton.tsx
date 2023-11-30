'use client';

import React from "react";

type Props = {
  className: string,
  toId: string
};

export default function SeeMoreButton({ className, toId }: Props) {
  function seeMore() {
    let element = document.getElementById(toId)
    element?.scrollIntoView({ behavior: "smooth", block: 'start' })
  }

  return (
    <button className={className} onClick={seeMore}>Se mere</button>
  );
}